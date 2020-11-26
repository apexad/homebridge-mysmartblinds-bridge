/* eslint-disable no-console */
import rp from 'request-promise';
import prompt from 'prompt';
import {
  MYSMARTBLINDS_DOMAIN,
  MYSMARTBLINDS_OPTIONS,
  MYSMARTBLINDS_HEADERS,
  MYSMARTBLINDS_GRAPHQL,
  MYSMARTBLINDS_QUERIES,
} from './settings';

import {
  MySmartBlindsAuth,
} from './config';

prompt.get(['username', {name: 'password', hidden: true }], (err: Error, result: MySmartBlindsAuth) => {
  rp({
    method: 'POST',
    uri: `https://${MYSMARTBLINDS_DOMAIN}/oauth/ro`,
    json: true,
    body: Object.assign(
      {},
      MYSMARTBLINDS_OPTIONS,
      {
        username: result.username,
        password: result.password,
      },
    ),
    headers: MYSMARTBLINDS_HEADERS,
  }).then((response) => {
    rp({
      method: 'POST',
      uri: MYSMARTBLINDS_GRAPHQL,
      json: true,
      headers: Object.assign(
        {},
        MYSMARTBLINDS_HEADERS,
        { Authorization: `Bearer ${response.id_token}` },
      ),
      body: { query: MYSMARTBLINDS_QUERIES.GetUserInfo, variables: null },
    }).then((response) => {
      console.log(response.data.user);
    });
  });
});
