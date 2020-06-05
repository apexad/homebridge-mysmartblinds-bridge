const auth0 = require('auth0');
const rp = require('request-promise');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
let auth0Token, auth0TokenInterval;

const smartblinds_auth = {
  domain: 'mysmartblinds.auth0.com',
  clientId: '1d1c3vuqWtpUt1U577QX5gzCJZzm8WOB',
};

const smartblinds_options = {
  device: 'smartblinds_client',
  scope: "openid offline_access",
  realm: 'Username-Password-Authentication',
}

const smartblindsGraphQL = 'https://api.mysmartblinds.com/v1/graphql';

function MySmartBlindsBridge(log, config) {
  /* plugin not configured check */
  if (!config) {
    return;
  }

  /* setup config */
  this.config = config;
  this.username = config["username"];
  this.password = config["password"];
  this.allowDebug = config["allow_debug"] || false;

  this.log = log;

  try {
    if (!this.username) {
      throw new Error('MySmartBlinds Bridge - You must provide a username');
    }
    if (!this.password) {
      throw new Error('MySmartBlinds Bridge - You must provide a password');
    }
  } catch(err) {
    this.log(err);
  }
}

MySmartBlindsBridge.prototype = {
  accessories: function (callback) {
    const platform = this;
    const foundBlinds = [];

    if (!this.username || !this.password) {
      callback(foundBlinds);
      return;
    }

    this.log('Looking for blinds...');
    const authenticationClient = new auth0.AuthenticationClient(
      smartblinds_auth
    );
    authenticationClient.database.signIn(
      Object.assign(
        {},
        smartblinds_options,
        { username: platform.username, password: platform.password }
      ),
      function (err, authResult) {
        if (err) {
          platform.log(err.message);
          callback(foundBlinds);
          return;
        } else {
          auth0Token = authResult.id_token;

          // Auth Token will expire in about 10 hours, so to beat that, refresh it every 8 hours
          auth0TokenInterval = setInterval(platform.refreshAuthToken.bind(platform), 1000 * 60 * 60 * 8);
          const options = {
            method: 'POST',
            uri: smartblindsGraphQL,
            body: {
              query: `
              query GetUserInfo {
                user {
                  rooms {
                    id
                    name
                    deleted
                  }
                  blinds {
                    name
                    encodedMacAddress
                    encodedPasskey
                    roomId
                    deleted
                  }
                }
              }
            `,
              variables: null,
            },
            json: true,
            headers: {
              Authorization: `Bearer ${auth0Token}`
            }
          };
          rp(options)
            .then(function (parsedBody) {
              const {
                rooms,
                blinds,
              } = parsedBody.data.user;

              if (platform.allowDebug) {
                platform.log('DEBUG', 'GetUserInfo', JSON.stringify(parsedBody));
              }

              const blindPromise = [];
              blinds.forEach((blind) => {
                if (!blind.deleted) {
                  const blind_options = {
                    method: 'POST',
                    uri: 'https://api.mysmartblinds.com/v1/graphql',
                    body: {
                      query: `
                      query GetBlindsState($blinds: [String]) {
                        blindsState(encodedMacAddresses: $blinds) {
                          encodedMacAddress
                          position
                          rssi
                          batteryLevel
                        }
                      }
                    `,
                      variables: { blinds: blind.encodedMacAddress },
                    },
                    json: true,
                    headers: {
                      Authorization: `Bearer ${auth0Token}`,
                    }
                  };
                  blindPromise.push(
                    rp(blind_options)
                      .then(function (parsedBody) {
                        if (platform.allowDebug) {
                          platform.log('DEBUG', 'GetBlindsState', JSON.stringify(parsedBody));
                        }

                        const blindState = parsedBody.data.blindsState[0];
                        let homeKitBlindPosition = parseInt(blindState.position);
                        if (platform.config.closeUp && homeKitBlindPosition > 100) {
                          homeKitBlindPosition = Math.abs(homeKitBlindPosition - 200);
                        }
                        const accessory = new MySmartBlindsBridgeAccessory(platform.log, platform.config,
                          {
                            name: `${rooms[_.findIndex(rooms, { id: blind.roomId })].name} ${blind.name}`,
                            encodedMacAddress: blind.encodedMacAddress,
                            blindPosition: homeKitBlindPosition,
                            batteryLevel: blindState.batteryLevel
                          });
                        foundBlinds.push(accessory);
                      })
                      .catch(function(err) {
                        const blindError = `${rooms[_.findIndex(rooms, { id: blind.roomId })].name} ${blind.name}: ${err.message}`
                        throw new Error(blindError); // re-catch later (in Promise.all)
                      })
                  );
                }
              })
              Promise.all(blindPromise).then(() => {
                callback(foundBlinds);
              })
              .catch(function(err) {
                platform.log('Error during blind state fetch', err);
                callback(foundBlinds);
                return;
              });
            })
            .catch(function (err) {
              platform.log('Error getting user info/auth token', err);
              callback(foundBlinds);
              return;
            });
        }
      }
    )
  },
  refreshAuthToken: function () {
    const platform = this;
    const authenticationClient = new auth0.AuthenticationClient(
      smartblinds_auth
    );
    authenticationClient.database.signIn(
      Object.assign(
        {},
        smartblinds_options,
        { username: platform.username, password: platform.password }
      ),
      function (err, authResult) {
        if (err) {
          platform.log(err);
        } else {
          auth0Token = authResult.id_token;
          const auth0TokenExpireDate = new Date(jwt.decode(authResult.id_token).exp * 1000).toISOString()
          if (platform.allowDebug) {
            platform.log(`auth0Token refresh, now expires ${auth0TokenExpireDate}`);
          }
        }
      }
    );
  }
}

function MySmartBlindsBridgeAccessory(log, config, blind) {
  this.log = log;
  this.config = config;
  this.name = blind.name;
  this.encodedMacAddress = blind.encodedMacAddress;
  this.blindPosition = blind.blindPosition;
  this.batteryLevel = blind.batteryLevel;
  this.currentPosition = this.blindPosition;
  this.targetPosition = this.blindPosition;
  this.closeUp = this.config["closeUp"] || false;
  this.statusLog = this.config["status_log"] || false;

  this.positionState = Characteristic.PositionState.STOPPED;
}

MySmartBlindsBridgeAccessory.prototype = {
  getCurrentPosition: function (callback) {
    // using cached current position, rather than fetching actual current position via the API
    let reportCurrentPosition = parseInt(this.currentPosition);

    const check99 = reportCurrentPosition === 99;
    if (check99) {
      reportCurrentPosition = 100;
    }

    const check1 = reportCurrentPosition === 1;
    if (check1) {
      reportCurrentPosition = 0;
    }
    if (this.statusLog) {
      this.log(`STATUS: ${this.name} getCurrentPosition : ${reportCurrentPosition}${check99 ? ` (Actual ${this.currentPosition})` : ''}`);
    }
    callback(null, reportCurrentPosition);
  },
  getTargetPosition: function (callback) {
    let reportTargetPosition = this.targetPosition;

    const check99 = reportTargetPosition === 99;
    if (check99) {
      reportTargetPosition = 100;
    }

    const check1 = reportTargetPosition === 1;
    if (check1) {
      reportTargetPosition = 0;
    }

    if (this.statusLog) {
      this.log(`STATUS: ${this.name} getTargetPosition : ${reportTargetPosition}${check99 ? ` (Actual ${this.targetPosition})` : ''}`);
    }
    this.service.setCharacteristic(Characteristic.PositionState, Characteristic.PositionState.STOPPED);
    callback(null, reportTargetPosition);
  },
  setTargetPosition: function (value, callback) {
    const thisBlind = this;
    thisBlind.targetPosition = parseInt(value);

    thisBlind.log(`${thisBlind.name} setTargetPosition from ${thisBlind.currentPosition} to ${thisBlind.targetPosition}`);

    const options = {
      method: 'POST',
      uri: smartblindsGraphQL,
      body: {
        query: `
        mutation UpdateBlindsPosition($blinds: [String], $position: Int!) {
          updateBlindsPosition(encodedMacAddresses: $blinds, position: $position) {
            encodedMacAddress
            position
            rssi
            batteryLevel
          }
        }
      `,
        variables: {
          position: thisBlind.closeUp ? (Math.abs(thisBlind.targetPosition - 200)) : thisBlind.targetPosition,
          blinds: this.encodedMacAddress
        },
      },
      json: true,
      headers: {
        Authorization: `Bearer ${auth0Token}`
      }
    };
    rp(options)
      .then(function (parsedBody) {
        // update battery level since we jusr ran the motor a bit
        thisBlind.batteryLevel = parsedBody.data.updateBlindsPosition[0].batteryLevel;
        thisBlind.currentPosition = thisBlind.targetPosition;
        thisBlind.service.setCharacteristic(Characteristic.CurrentPosition, thisBlind.currentPosition);
        thisBlind.service.setCharacteristic(Characteristic.PositionState, Characteristic.PositionState.STOPPED);
        thisBlind.log(`${thisBlind.name} currentPosition is now ${thisBlind.currentPosition}`);
        callback(null);
      })
      .catch(function(err) {
        thisBlind.log(`${thisBlind.name} setTargetPosition ERROR`, err);
        callback(null);
      });
  },
  getPositionState: function (callback) {
    this.log(`${this.name} getPositionState : ${this.positionState}`);
    callback(null, this.positionState);
  },
  getBatteryLevel: function (callback) {
    // using cached battery level, rather than fetching actual level, updated after target position changed
    callback(null, parseFloat(this.batteryLevel));
  },
  getStatusLowBattery: function (callback) {
    // value of -1 means data was not sent correctly, so ignore it for now
    callback(
      null,
      (this.batteryLevel < 20 && this.batteryLevel !== -1)
        ? Characteristic.StatusLowBattery.BATTERY_LEVEL_LOW
        : Characteristic.StatusLowBattery.BATTERY_LEVEL_NORMAL
    )
  },
  getServices: function () {
    const services = []

    this.service = new Service.WindowCovering(this.name);

    this.service.getCharacteristic(Characteristic.CurrentPosition)
      .on('get', this.getCurrentPosition.bind(this));

    this.service.getCharacteristic(Characteristic.TargetPosition)
      .on('get', this.getTargetPosition.bind(this))
      .on('set', this.setTargetPosition.bind(this));

    this.service.getCharacteristic(Characteristic.PositionState)
      .on('get', this.getPositionState.bind(this));

    services.push(this.service);

    const batteryService = new Service.BatteryService(this.name);
    batteryService.getCharacteristic(Characteristic.BatteryLevel)
      .setProps({ maxValue: 100, minValue: 0, minStep: 1 })
      .on('get', this.getBatteryLevel.bind(this));

    batteryService.getCharacteristic(Characteristic.StatusLowBattery)
    .on('get', this.getStatusLowBattery.bind(this))

    services.push(batteryService);

    const service = new Service.AccessoryInformation();

    service.setCharacteristic(Characteristic.Manufacturer, "MySmartBlinds")
      .setCharacteristic(Characteristic.Name, this.name)
      .setCharacteristic(Characteristic.SerialNumber, this.encodedMacAddress)
      .setCharacteristic(Characteristic.Model, 'Window Blind');

    services.push(service);

    return services;
  }
}

module.exports.accessory = MySmartBlindsBridgeAccessory;
module.exports.platform = MySmartBlindsBridge;

let Service, Characteristic;

module.exports = function (homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerPlatform('homebridge-mysmartblinds-bridge', 'MySmartBlindsBridge', MySmartBlindsBridge);
};