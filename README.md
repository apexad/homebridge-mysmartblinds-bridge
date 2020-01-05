# homebridge-mysmartblinds-bridge
[Homebridge](https://github.com/nfarina/homebridge) plugin which communicates with MySmartBlinds through the [MySmartBlinds Smart Bridge](https://www.mysmartblinds.com/products/smart-hub). You must have configured your blinds and bridge with the official iOS or Android app first in order to use this homebridge plugin.

USE AT YOUR OWN RISK.

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
**name**                | Must alwasy be "MySmartBlindsBridge", (required)
**username**            | MySmartBlinds app username (usually email address), (required)
**password**            | MySmartBlinds app username (usually email address), (required)

## to-do
1. add ability to change direction (from up closed to open)
2. add an option that allows full blind motion, from down closed to open to up closed


## credits
[ianlevesque/smartblinds-client](https://github.com/ianlevesque/smartblinds-client) used to understand mysmartblinds bridge API  
[Nicnl/homebridge-minimal-http-blinds](https://github.com/Nicnl/homebridge-minimal-http-blinds) used as an example of blind accessory 
[crashtestoz/homebridge-http-window-blinds](https://github.com/crashtestoz/homebridge-http-window-blinds) also used as an example of blind accessory
