import {
  AuthenticationClient,
  SignInToken,
} from 'auth0';
import rp from 'request-promise';
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
import {
  MySmartBlindsConfig,
  MySmartBlindsAuth,
  MySmartBlindsBlind,
} from './config';
import { MySmartBlindsAccessory } from './platformAccessory';

export class MySmartBlindsBridgePlatform implements DynamicPlatformPlugin {
  public readonly Service: typeof Service = this.api.hap.Service;
  public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;

  public readonly accessories: PlatformAccessory[] = [];
  auth0Token!: string | undefined;
  auth0TokenInterval?: NodeJS.Timeout;
  authenticationClient!: AuthenticationClient;
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
  auth!: MySmartBlindsAuth;

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
    this.authenticationClient = new AuthenticationClient(MYSMARTBLINDS_AUTH);

    try {
      if (!this.config.username) {
        throw new Error('MySmartBlinds Bridge - You must provide a username');
      }
      if (!this.config.password) {
        throw new Error('MySmartBlinds Bridge - You must provide a password');
      }
      this.auth = {
        username: this.config.username,
        password: this.config.password,
      };
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
    this.log.info('Loading blind from cache:', accessory.displayName);
    this.accessories.push(accessory);
  }

  refreshAuthToken() {
    return new Promise((resolve, reject) => {
      this.authenticationClient?.database?.signIn(
        Object.assign({}, MYSMARTBLINDS_OPTIONS, this.auth),
        (err: Error, authResult: SignInToken) => {
          if (authResult) {
            this.auth0Token = authResult.id_token;
            this.requestOptions = {
              method: 'POST',
              uri: MYSMARTBLINDS_GRAPHQL,
              json: true,
              headers: {
                Authorization: `Bearer ${this.auth0Token}`,
              },
            };

            this.auth0TokenExpireDate = new Date(
              (jwt.decode(authResult.id_token || '{ exp: 0 }') as { exp: number }).exp * 1000,
            ).toISOString();
            if (this.config.allowDebug) {
              this.log.info(`auth0Token refresh, now expires ${this.auth0TokenExpireDate}`);
            }
            resolve();
          } else if (err) {
            reject(err);
          }
        },
      );
    });
  }

  convertPosition(blindPosition: string) {
    let convertedPosition = parseInt(blindPosition);

    if (this.config.closeUp && convertedPosition > 100) {
      convertedPosition = Math.abs(convertedPosition - 200);
    }
    return convertedPosition;
  }

  discoverDevices() {
    this.refreshAuthToken().then(() => {
      this.auth0TokenInterval = setInterval(this.refreshAuthToken.bind(this), 1000 * 60 * 60 * 8);
      rp(Object.assign(this.requestOptions, { body: { query: MYSMARTBLINDS_QUERIES.GetUserInfo, variables: null } }))
        .then((response) => {
          if (this.config.allowDebug) {
            this.log.debug('GetUserInfo', response.data.user);
          }
          const {
            rooms,
            blinds,
          } = response.data.user;

          const activeBlinds = blinds.filter((blind: MySmartBlindsBlind) => !blind.deleted);
          const deletedBlinds = blinds.filter((blind: MySmartBlindsBlind) => blind.deleted);

          activeBlinds.forEach((blind: MySmartBlindsBlind) => {
            const uuid = this.api.hap.uuid.generate(blind.encodedMacAddress);
            const blindName = `${rooms.find((room: { id: number }) => room.id === blind.roomId).name} ${blind.name}`;

            const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);
            if (existingAccessory) {
              this.log.debug('Restore cached blind:', blindName);
              new MySmartBlindsAccessory(this, existingAccessory);
              this.api.updatePlatformAccessories([existingAccessory]);
            } else {
            // the accessory does not yet exist, so we need to create it
              this.log.info('Adding new blind:', blindName);
        
              // create a new accessory
              const accessory = new this.api.platformAccessory(blindName, uuid);
              rp(Object.assign(
                this.requestOptions,
                { body: { query: MYSMARTBLINDS_QUERIES.GetBlindSate, variables: { blinds: blind.encodedMacAddress } } },
              )).then((response) => {
                const blindState = response.data.blindsState[0];
                const homeKitBlindPosition = this.convertPosition(blindState.position);
                accessory.context.blind = {
                  name: blindName,
                  macAddress: blind.encodedMacAddress,
                  blindPosition: homeKitBlindPosition,
                  batteryLevel: blindState.batteryLevel as number,
                };
        
                new MySmartBlindsAccessory(this, accessory);
        
                this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
              }).catch((error) => this.log.error(error));
            }
          });
          deletedBlinds.forEach((blind) => {
            const uuid = this.api.hap.uuid.generate(blind.encodedMacAddress);
            const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);
            const inActive = activeBlinds.findIndex(
              (activeBlind: MySmartBlindsBlind) => blind.encodedMacAddress === activeBlind.encodedMacAddress,
            ) > -1;

            if (existingAccessory && !inActive) {
              this.accessories.splice(this.accessories.findIndex(acc => acc.UUID === existingAccessory.UUID), 1);
              this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [existingAccessory]);
              this.log.info('Deleted blind from cache:', existingAccessory.displayName);
            }
          });
        });
    });
  }
}
