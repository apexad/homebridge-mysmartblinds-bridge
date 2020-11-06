/* eslint-disable @typescript-eslint/no-this-alias */
import { AuthenticationClient } from 'auth0';
import {
  findIndex,
  differenceWith,
} from 'lodash';
import request from 'request-promise';
import jwt from 'jsonwebtoken';

import {
  API,
  DynamicPlatformPlugin,
  Logger,
  PlatformAccessory,
  PlatformConfig,
  Service,
  Characteristic,
} from 'homebridge';

import {
  PLATFORM_NAME,
  PLUGIN_NAME,
  MYSMARTBLINDS_AUTH,
  MYSMARTBLINDS_OPTIONS,
  MYSMARTBLINDS_GRAPHQL,
  MYSMARTBLINDS_QUERIES,
} from './settings';
import { MySmartBlindsConfig } from './config';
import { MySmartBlindsAccessory } from './platformAccessory';

export class MySmartBlindsBridgePlatform implements DynamicPlatformPlugin {
  public readonly Service: typeof Service = this.api.hap.Service;
  public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;

  public readonly accessories: PlatformAccessory[] = [];
  auth0Token!: string;
  auth0TokenInterval?: NodeJS.Timeout;
  authenticationClient: AuthenticationClient;
  requestOptions!: {
    method: string;
    uri: string;
    body?: {
      query: string;
      variables: {
        position: string;
        blinds: string;
      };
    };
    json: boolean;
    headers: {
      Authorization: string;
    };
  };
  
  auth0TokenExpireDate?: string;

  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig & MySmartBlindsConfig,
    public readonly api: API,
  ) {
    /* plugin not configured check */
    if (!config) {
      this.log.info('No configuration found for platform ', PLATFORM_NAME);
      return;
    }

    /* setup config */
    this.config = config;
    this.log = log;

    try {
      if (!this.config.username) {
        throw new Error('MySmartBlinds Bridge - You must provide a username');
      }
      if (!this.config.password) {
        throw new Error('MySmartBlinds Bridge - You must provide a password');
      }
    } catch(err) {
      this.log.error(err);
    }
    this.log.debug('Finished initializing platform:', this.config.name);

    this.api.on('didFinishLaunching', () => {
      this.log.debug('Executed didFinishLaunching callback');
      this.discoverDevices();
    });
  }

  configureAccessory(accessory: PlatformAccessory) {
    this.log.info('Loading accessory from cache:', accessory.displayName);
    this.accessories.push(accessory);
  }

  refreshAuthToken() {
    const platform = this;

    return new Promise((resolve, reject) => {
      platform.authenticationClient.database.signIn(
        Object.assign(
          {},
          MYSMARTBLINDS_OPTIONS,
          { username: platform.config.username, password: platform.config.password },
        ),
        (err: never, authResult: { id_token: string }) => {
          if (authResult) {
            platform.auth0Token = authResult.id_token;
            platform.requestOptions = {
              method: 'POST',
              uri: MYSMARTBLINDS_GRAPHQL,
              json: true,
              headers: {
                Authorization: `Bearer ${platform.auth0Token}`,
              },
            };
            platform.auth0TokenExpireDate = new Date(jwt.decode(authResult.id_token).exp * 1000).toISOString();
            if (platform.config.allowDebug) {
              platform.log.info(`auth0Token refresh, now expires ${platform.auth0TokenExpireDate}`);
            }
            resolve();
          } else if (err) {
            reject(err);
          }
        },
      );
    });
  }

  discoverDevices() {
    this.authenticationClient = new AuthenticationClient(
      MYSMARTBLINDS_AUTH,
    );
    const platform = this;
    platform.refreshAuthToken().then(() => {
      platform.auth0TokenInterval = setInterval(platform.refreshAuthToken.bind(platform), 1000 * 60 * 60 * 8);
      request(Object.assign(
        platform.requestOptions,
        { body: { query: MYSMARTBLINDS_QUERIES.GetUserInfo, variables: null } },
      ))
        .then((response) => {
          if (platform.config.allowDebug) {
            platform.log.info('DEBUG', 'GetUserInfo', response.data.user);
          }
          const {
            rooms,
            blinds,
          } = response.data.user;

          const notDeletedBlinds = blinds.filter(blind => !blind.deleted);
          const deletedBlinds = differenceWith(
            blinds.filter(blind => blind.deleted),
            notDeletedBlinds,
            (dBlind, nBlind) => dBlind.encodedMacAddress === nBlind.encodedMacAddress,
          );

          notDeletedBlinds.forEach((blind) => {
            const uuid = platform.api.hap.uuid.generate(blind.encodedMacAddress);
            const blindName = `${rooms[findIndex(rooms, { id: blind.roomId })].name} ${blind.name}`;

            const existingAccessory = platform.accessories.find(accessory => accessory.UUID === uuid);
            if (existingAccessory) {
              platform.log.debug('Restore cached blind:', blindName);
              new MySmartBlindsAccessory(platform, existingAccessory);
              platform.api.updatePlatformAccessories([existingAccessory]);
            } else {
            // the accessory does not yet exist, so we need to create it
              platform.log.info('Adding new blind', blindName);
        
              // create a new accessory
              const accessory = new platform.api.platformAccessory(blindName, uuid);
              request(Object.assign(
                platform.requestOptions,
                { body: { query: MYSMARTBLINDS_QUERIES.GetBlindSate, variables: { blinds: blind.encodedMacAddress } } },
              )).then((response) => {
                const blindState = response.data.blindsState[0];
                let homeKitBlindPosition = parseInt(blindState.position);
                if (platform.config.closeUp && homeKitBlindPosition > 100) {
                  homeKitBlindPosition = Math.abs(homeKitBlindPosition - 200);
                }
                accessory.context.blind = {
                  name: blindName,
                  macAddress: blind.encodedMacAddress,
                  blindPosition: homeKitBlindPosition,
                  batteryLevel: blindState.batteryLevel as number,
                };
        
                new MySmartBlindsAccessory(platform, accessory);
        
                platform.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
              }).catch((error) => platform.log.error(error));
            }
          });
          deletedBlinds.forEach((blind) => {
            const uuid = platform.api.hap.uuid.generate(blind.encodedMacAddress);
            const existingAccessory = platform.accessories.find(accessory => accessory.UUID === uuid);

            if (existingAccessory) {
              platform.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [existingAccessory]);
              platform.log.info('Removing existing accessory from cache:', existingAccessory.displayName);
            }
          });
        });
    });
  }
}
