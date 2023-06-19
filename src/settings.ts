/* Plugin Infrmation */
export const PLATFORM_NAME = 'MySmartBlindsBridge';
export const PLUGIN_NAME = 'homebridge-mysmartblinds-bridge';

/* MySmartBlinds App Settings */
export const MYSMARTBLINDS_DOMAIN = 'mysmartblinds.auth0.com';

export const MYSMARTBLINDS_OPTIONS = {
  scope: 'openid email offline_access',
  grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
  client_id: '1d1c3vuqWtpUt1U577QX5gzCJZzm8WOB',
  realm: 'Username-Password-Authentication',
  audience: '',
};

export const MYSMARTBLINDS_HEADERS = {
  headers: {
    'User-Agent': 'MySmartBlinds/2.3.3 (iPhone; iOS 14.2; Scale/2.00',
    'auth0-client-id': MYSMARTBLINDS_OPTIONS.client_id,
  },
};

export const MYSMARTBLINDS_GRAPHQL = 'https://api.mysmartblinds.com/v1/graphql';

/* MySmartBlinds Queries */
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
