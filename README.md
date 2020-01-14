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

## notes
1. Be sure to calibrate your blinds in the 'MySmartBlinds' app if you see that the blinds are not opening perfectly straight

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
**platform**            | Must always be "MySmartBlindsBridge". (required)
**name**                | Best to set to "MySmartBlindsBridge", (required)
**username**            | MySmartBlinds app username (usually email address), (required)
**password**            | MySmartBlinds app password, (required)

## to-do
1. Add config option to change direction (from up closed to open)
2. Add config option that allows full blind motion, from down closed (0) to open (100) to up closed (200)
3. Investigate API limits and nadd polling for when blinds are changed in the MySmartBlinds app

## credits
[ianlevesque/smartblinds-client](https://github.com/ianlevesque/smartblinds-client) used to understand mysmartblinds bridge API  
[Nicnl/homebridge-minimal-http-blinds](https://github.com/Nicnl/homebridge-minimal-http-blinds) used as an example of blind accessory  
[crashtestoz/homebridge-http-window-blinds](https://github.com/crashtestoz/homebridge-http-window-blinds) also used as an example of blind accessory  
primary tester/hardware provider for the project: mrferreira89 (reddit user)
