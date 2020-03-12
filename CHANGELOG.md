# Changelog

All notable changes to this project will be documented in this file.

## [1.3.2](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v1.3.1...v1.3.2) (2020-03-11)


### Documentation

* **readme:** remove to do section ([68b5adb](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/68b5adb667f3aed568094db2347c8b2dabe7d1f9))

## [1.3.1](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v1.3.0...v1.3.1) (2020-03-11)


### Documentation

* **readme:** added info about blinds down or up ([2b20cf6](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/2b20cf649ea34df13581f86b8d526b8e54b8fd20))

## [1.3.0](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v1.2.5...v1.3.0) (2020-03-08)


### Features

* **plugin feature/config option:** done with todo item: option to close blinds up ([533788d](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/533788de83f8d5140489fbbae97083b677f9b5ed)), closes [#6](https://github.com/apexad/homebridge-mysmartblinds-bridge/issues/6)

* **removed config option:** removed `report99Open` config option, this is now always true ([cb66d31](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/cb66d31f2d498755c7daa540c30c0eb6e097a8c6)))

### Bug Fixes

* **config schema:** mark `closeUp` (and `report99Open` prior to removal) as optional (from required: true) ([37d402b](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/37d402b49c753559b3d744a748f65175fd9d320f))

### Documentation

* **funding:** if you like this plugin and/or my work on it, consider donating via paypal ([140536f](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/140536f6ecd5ec13cece23ddb4ba8591850b1a00))

* **readme:** removed all fields required verbage, remove `report99Open`, add `closeUp` ([40d0a70](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/40d0a700f30ede71809def15d197567a57c8b4ba))

* **readme:** add sponsor [gregmichael](https://github.com/gregmichael) ([979d0e3](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/979d0e3945d8354a92129baf7f7cb576680039be))

* **readme:** separate sponsors/code credit ([5136231](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/5136231c82c317b5f0c6ee25a33960f60df4bea9))

* **changelog:** finally added a changelog ([2983a288](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/2983a288ff3a32633c38035c8bb28b87ac2bddc0))

## [1.2.5](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v1.2.4...v1.2.5) (2020-02-09)


### Bug Fixes

* **plugin code:** fix spelling of `currentPosition` ([2110ccc](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/2110ccc49210b5f2384a9046b42618219535840f))

### Documentation

* **funding:** if you like this plugin and/or my work on it, consider funding my future work on this plugin and others via Sponsor button ([ad2d72e5](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/ad2d72e54c4fdf7af03d8e83b9fc916cbd754144))

## [1.2.4](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v1.2.3...v1.2.4) (2020-01-25)

### Bug Fixes

* **config schema:** add `report99Open` to config schema ([8f9f542](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/8f9f542575137490d13fa54c4cf1e0d8816e6af7))

## [1.2.3](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v1.2.2...v1.2.3) (2020-01-25)


### Features

* **plugin feature/config option:** add `report99Open` option to correct restart issue where blinds report 99% ([0099f2a](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/0099f2a981a69e7bbad565a6cd390dcae9a03bbd)))

## [1.2.2](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v1.2.1...v1.2.2) (2020-01-16)


### Features

* **config schema:** add config schema for [homebridge-config-ui-x](https://www.npmjs.com/package/homebridge-config-ui-x) ([74453f1](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/74453f1f4dcf679bc537c8102eb9041acb642f06))

### Documentaation

* **readme:** small correction to readme ([3442369](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/3442369d268695f95d2a5a0f7040b6f6337bc682))

## [1.2.1](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v1.2.0...v1.2.1) (2020-01-16)


### Bug Fixes

* **plugin code:**: do not report -1 battery status, likely an incorrect value ([96bfccb](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/96bfccbbc6818ab80e2eb59cab4f1ddbdb789399))

* **plugin code:** handle errors via catch for all requests ([c898a25](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/c898a25ef5f8607f8a1a237f8a497ee6598a9f33))

### Documentation

* **readme:** clean up fields list ([da02d15](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/da02d15b0a00e2f1ba64d5a2c2637b5ceeea012b))

* **readme:** fix readme spelling ([d9b42a5](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/d9b42a5118f42022384aded62ada23ee6abb3cd9))

* **readme:** update readme with todo for polling ([12c87ab](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/12c87ab9623f9d5b5317a23bc6e86e9c495126b8))

## [1.2.0](https://github.com/apexad/homebridge-mysmartblinds-bridge/releases/tag/v1.2.0) (2020-01-11)


### Bug Fixes

* **plugin code:**  fix token refresh to have this/platform context ([3accd2d](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/3accd2d97fe36e030d54c134826a5628271633a3))

### Documentation

* **readme:** spelling fix ([d56ef81](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/d56ef8104123559ec98e131ec247ba0124c5c053))
