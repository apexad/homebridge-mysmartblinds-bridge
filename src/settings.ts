export const PLATFORM_NAME = 'MySmartBlindsBridge';
export const PLUGIN_NAME = 'homebridge-mysmartblinds-bridge';
export const MYSMARTBLINDS_AUTH = {
  domain: 'mysmartblinds.auth0.com',
  clientId: '1d1c3vuqWtpUt1U577QX5gzCJZzm8WOB',
};

export const MYSMARTBLINDS_OPTIONS = {
  device: 'smartblinds_client',
  scope: 'openid offline_access',
  realm: 'Username-Password-Authentication',
};

export const MYSMARTBLINDS_GRAPHQL = 'https://api.mysmartblinds.com/v1/graphql';

export const MYSMARTBLINDS_QUERIES = {
  GetUserInfo: `
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
  GetBlindSate: `
    query GetBlindsState($blinds: [String]) {
      blindsState(encodedMacAddresses: $blinds) {
        encodedMacAddress
        position
        rssi
        batteryLevel
      }
    }
  `,
  UpdateBlindsPosition: `
    mutation UpdateBlindsPosition($blinds: [String], $position: Int!) {
      updateBlindsPosition(encodedMacAddresses: $blinds, position: $position) {
        encodedMacAddress
        position
        rssi
        batteryLevel
      }
    }
  `,
};
