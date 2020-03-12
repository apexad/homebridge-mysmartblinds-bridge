# homebridge-mysmartblinds-bridge
[![NPM Version](https://img.shields.io/npm/v/homebridge-mysmartblinds-bridge.svg)](https://www.npmjs.com/package/homebridge-mysmartblinds-bridge)

[Homebridge](https://github.com/nfarina/homebridge) plugin which communicates with MySmartBlinds through the [MySmartBlinds Smart Bridge](https://www.mysmartblinds.com/products/smart-hub). You must have configured your blinds and bridge with the official iOS or Android app first in order to use this homebridge plugin.

This plugin is not affilited with the MySmartBlinds product.

## features
1. Uses bridge to auto-detect all blinds setup in the MySmartBlinds app, no need to specify each blind
2. Supports blind percentages
3. Shows battery level for each blind (updated only when blind is open/closed)
4. Issues a low battery indicator if battery is below 20%
5. Logging (via Homebridge) of all actions done
6. Blinds can close down or up (via config option)

## notes
1. Be sure to calibrate your blinds in the 'MySmartBlinds' app if you see that the blinds are not opening perfectly straight
2. If after calibration you see blinds show as 99% Open (when using automation), set `report99Open` to `true` to see if this helps

## minimal configuration
Add to platforms section of homebridge `config.json` after installing the plugin:
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
**closeUp**             | __(optional, defaults to false)__ Blinds close in the upwards position

## sponsors
mrferreira89 (reddit user) - primary tester/sponsor and provided project hardware  
[gregmichael](https://github.com/gregmichael) - sponsor and tester

## code credits
[ianlevesque/smartblinds-client](https://github.com/ianlevesque/smartblinds-client) - used to understand mysmartblinds bridge API  
[Nicnl/homebridge-minimal-http-blinds](https://github.com/Nicnl/homebridge-minimal-http-blinds) - used as an example of blind accessory  
[crashtestoz/homebridge-http-window-blinds](https://github.com/crashtestoz/homebridge-http-window-blinds) - also used as an example of blind accessory
