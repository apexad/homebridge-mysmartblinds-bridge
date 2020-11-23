<p align="center">
  <a href="https://github.com/homebridge/homebridge/wiki/Verified-Plugins#verified-plugins"><img alt="Homebridge Verified" src="https://raw.githubusercontent.com/apexad/homebridge-mysmartblinds-bridge/master/branding/Homebridge_x_MySmartBlinds.png" width="500px"></a>
</p>

# homebridge-mysmartblinds-bridge
[![mit license](https://badgen.net/badge/license/MIT/red)](https://github.com/apexad/homebridge-mysmartblinds-bridge/blob/master/LICENSE)
[![npm](https://badgen.net/npm/v/homebridge-mysmartblinds-bridge)](https://www.npmjs.com/package/homebridge-mysmartblinds-bridge)
[![npm](https://badgen.net/npm/dt/homebridge-mysmartblinds-bridge)](https://www.npmjs.com/package/homebridge-mysmartblinds-bridge)
[![verified-by-homebridge](https://badgen.net/badge/homebridge/verified/purple)](https://github.com/homebridge/homebridge/wiki/Verified-Plugins)
[![donate](https://badgen.net/badge/donate/paypal/91BE09)](https://www.paypal.me/apexadm)


[Homebridge](https://github.com/homebridge/homebridge) plugin which communicates with MySmartBlinds through the [MySmartBlinds Smart Bridge](https://www.mysmartblinds.com/products/smart-hub).  
Configure your blinds and bridge with the official iOS or Android app first in order to use this homebridge plugin.

This plugin is not affiliated with the MySmartBlinds product.

## Features
1. Uses bridge to auto-detect all blinds setup in the MySmartBlinds app, no need to specify each blind
2. Supports blind percentages
3. Shows battery level for each blind (updated only when blind is open/closed)
4. Issues a low battery indicator if battery is below 20%
5. Logging (via Homebridge) of all actions done
6. Blinds can close down or up (via config option)
7. Polling so that blinds update if changed outside of HomeKit

## Notes
1. Use the 'MySmartBlinds' app to calibrate a blind if it is not opening perfectly straight
2. If switching to `closeUp` it's best to Open all blinds first and then restart homebridge
3. If you see duplicate blinds, make sure to delete any 'disconnected'/invalid blinds within the iOS/Android app. (see [#23](https://github.com/apexad/homebridge-mysmartblinds-bridge/issues/23#issuecomment-725165376))
4. Polling Interval will be ignored if the (auth0) API [Rate Limit Policy](https://auth0.com/docs/policies/rate-limit-policy) is reached

## Configuration
This easiest way to use this plugin is to use [homebridge-config-ui-x](https://www.npmjs.com/package/homebridge-config-ui-x).  
To configure manually, add to the `platforms` section of homebridge's `config.json` after installing the plugin.

**Config:**
```json
{
  "platform": "MySmartBlindsBridge",
  "name": "MySmartBlindsBridge",
  "username": "<email address>",
  "password": "<password>"
}
```

Field                   | Description
------------------------|------------
**platform**            | Must always be "MySmartBlindsBridge"
**name**                | Best to set to "MySmartBlindsBridge"
**username**            | MySmartBlinds app username (usually email address)
**password**            | MySmartBlinds app password
**closeUp**             | _(optional true/false, defaults to false)_ Blinds close in the upwards position
**statusLog**           | _(optional true/false, defaults to false)_ logs position changes
**allowDebug**          | _(optional true/false, defaults to false)_ Outputs a lot of debug info to stdout
**pollingInterval**     | _(optional)_ Polling Interval (in minutes)

## Testing
If you need to test your MySmartBlinds credentials are working outside of homebridge:  
1. Clone this repo
2. Run `npm install`
3. Run `num run test:mysmartblinds-login`
4. Enter `username`
5. Enter `password` (text will be hidden for safety)

## Sponsors
mrferreira89 (reddit user) - primary tester/sponsor and provided project hardware  
[gregmichael](https://github.com/gregmichael) - sponsor and tester  
[name99-org](https://github.com/name99-org) - sponsor

## Code credits
[ianlevesque/smartblinds-client](https://github.com/ianlevesque/smartblinds-client) - used to understand mysmartblinds bridge API  
[Nicnl/homebridge-minimal-http-blinds](https://github.com/Nicnl/homebridge-minimal-http-blinds) - used as an example of blind accessory  
[crashtestoz/homebridge-http-window-blinds](https://github.com/crashtestoz/homebridge-http-window-blinds) - also used as an example of blind accessory
[homebridge/homebridge-plugin-template](https://github.com/homebridge/homebridge-plugin-template) - v2.0 rewrite based on this template
