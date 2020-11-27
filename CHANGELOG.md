# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.2.3](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v2.2.2...v2.2.3) (2020-11-27)


### Bug Fixes

* set correct intial battery level ([3b11a0c](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/3b11a0c1a6b568e35e550e66ebe20639e85da2c8))
* set correct intial blindPosition ([b7be91b](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/b7be91b0bb0878b38161f2c16b5ed25b7f8c3f89))

## [2.2.2](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v2.2.1..v2.2.2) (2020-11-25)

### Features

* **errors:** silence error messages, just display sttus code ([92fd3e6](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/92fd3e69bfa90fd7885a3540f6b571870e5f3af2))
* **headers:** fix headers, send user agent ([bcf5c1c](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/bcf5c1cd50b3e2602fee90abdca705ef7df48b1b))

### Code Changes (No change in functionality)

* **plugin code:** fix npx/bin to run login test (add test file runner for npx) ([7912e8f](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/7912e8f4c4301d0cb25b44522da0d5d2bf4d4728))


## [2.2.1](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v2.2.0..v2.2.1) (2020-11-25)

### Features

* **plugin code:** add npx/bin to run login test ([501c8c1](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/501c8c17f99b3881dfe8ec7e0ca646baadba2ae4))

## [2.2.0](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v2.1.2..v2.2.0) (2020-11-25)

### Features

* **plugin code(testing too):** add test:mysmartblinds-login script for testing ([231a44c](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/231a44c7a6ab8eacf31a3b521804c84345eeab62))

### Code Changes (No change in functionality)

* **plugin code:** code cleanup ([ad53a22](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/ad53a22a839de5bfbf4f317c484e9c511d4af008), [cd79242](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/cd79242090f5472b7796192cc178cdf29434e7d6))
* **plugin code:** remove auth0, switch to request call ([ee0e24f](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/ee0e24f3b8f6196c3c80911ccf99814c62034aac))
* **packge.json:** update depdendencies ([277e5f1](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/277e5f172af5c7b916c569d1d10ac13e1c3b3d55), [d3486e1](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/d3486e1fd0c0491bd83cea5f6e7390e2b8ccad1f), etc...)

### Documentation

* **package.json:** Update engines for Node 14.x and Homebridge 1.1.x ([06a6aad](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/06a6aad3d095b661749fb8c1d3871ef6d77ebc6b))
* **github:** Add dependabot ([09d4622](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/09d4622b823237ec13d0640c548011cff8e66100))
* **github:** Create issue no response configuration ([98571b9](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/98571b999cd3a210da4cf7d83348d330bb17db37))
* **readme:** correct link to smart bridge (for mysmartblinds) ([c6bb143](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/c6bb143e1112b330e539c5a42ad7368d0c1c9254))



## [2.1.2](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v2.1.1..v2.1.2) (2020-11-15)

### Features

* **bugfix:** cleaned up the code a bit, using corret types for auth0 (login)
* **bugfix:** corrected reuest calls so that blind is controllable before refresh

### Documentation

* **documentation:** update changelog to be in version sync again
* **documentatin:** added polling to feature list in the README


## [2.1.1](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v2.1.0..v2.1.1) (2020-11-12)

### Features

* **documentation:** update changelog 


## [2.1.0](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v2.0.4..v2.1.0) (2020-11-12)

### Features

* **feature:** adds polling via pollingInterval config ([a0de8b1](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/a0de8b1387b415dcda26dc72717e981f995d361c))


## [2.0.4](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v2.0.3..v2.0.4) (2020-11-06)

### Features

* **bug fix:** fix blind/room name bug in 2.0.3


## [2.0.3](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v2.0.2..v2.0.3) (2020-11-06)

### Features

* **cleanup:** cleanup deleted blind checking ([31dd73a](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/31dd73ab821c6477ad858beaac743053c02ce35d))

### Documentation

* **package.json:** update dependencies/re-generate package-lock/remove lodash


## [2.0.2](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v2.0.1..v2.0.2) (2020-11-06)

### Features

* **bug fix:** fix duplicate uuid/handle deleted blinds better ([2db9d28](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/2db9d28cbbf62340a43ec856dce2c98d0411cdb9))


## [2.0.1](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v2.0.0..v2.0.1) (2020-11-02)


### Features

* **bug fix:** fix closeUp ([f9a1882](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/f9a18827511f53c6c9042571d419b095c611d811))

## [2.0.0](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v1.5.6...v2.0.0) (2020-11-02)


### Documentation

* **config schema:** renamed status_log and allow_debug to statusLog and allowDebug for conistency
* **config schema:** removed section about adding bluetooth blind control (not going to do this)
* **readme:** updates to reflect change in config varibale names
* **readme:** updated paypal link to use direct linkt instead of button
* **license:** updated year
* **package.json:** update dependencies/re-generate package-lock

### Features
* **plugin feature:** now a dynamic platform (which uses homeebridge cache) instead of a static platform
* **plugin code change:** re-written fron the ground up to use typescript

## [1.5.6](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v1.5.4...v1.5.6) (2020-10-14)


### Documentation

* **package.json:** add funding link

* **package.json:** update dependencies

## [1.5.4](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v1.5.3...v1.5.4) (2020-06-04)


### Documentation

* **config schema:** remove old report99Open config option ([ea7adee](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/ea7adee2b1a34fc9272f3db827609cc6eba64ea8))

* **package.json:** add version script ([7c3e5bb](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/7c3e5bb3994e94ad3e830298047e8c57b7ebaec3))

### Features

* **plugin feature:** add encodedPasskey to logs, json stringify parsedBody in logs/closes #15 ([0552d31](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/0552d31fb03490c24ef6d648f83d1d8b6ea8cc33))

* **plugin feature:** removed addAccessory ([8ca2d51](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/8ca2d5147d062fda1cbb655c2f1d5a4cc8d36dc5))

## [1.5.3](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v1.5.2...v1.5.3) (2020-06-03)


### Documentation

* **config schema:** add informaton regarding bridge use by thus plugin ([750a027](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/750a0272dee5d982c7aaf01d0e3656fd38e0a51a))

## [1.5.2](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v1.5.1...v1.5.2) (2020-05-12)


### Features

* **plugin feature/config option:** fix config schema ([8f7119a](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/8f7119a9f996077bd4e37b5f0d8218f23985f12b)) closes [#12](https://github.com/apexad/homebridge-mysmartblinds-bridge/issues/12)

### Documentation

* **changelog:** fix version link ([8f7119a](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/8f7119a9f996077bd4e37b5f0d8218f23985f12b))

## [1.5.1](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v1.5.0...v1.5.1) (2020-05-12)


### Features

* **plugin feature/config option:** add config option status_log to stop logging status functions ([a320e63](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/a320e63e404099affebbdb42e5b2d1ef89aef12e))


## [1.5.0](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v1.4.1...v1.5.0) (2020-04-18)


### Features

* **plugin feature/config option:** add a allow_debug option ([ecc16cf](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/ecc16cfd3a451973daa42de8b3da1ff56c312c33))


## [1.4.1](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v1.4.0...v1.4.1) (2020-03-29)


### Documentation

* **readme:** add Homebridge/MySmartBlinds branding ([7be4845](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/7be4845a28ed48cd71fd811b34f3c60b7448f0ff))

* **mit license file:** corrected copyright name in MIT LICENSE ([3196174](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/31961743fac013954dd3739981544f4633c3fb5a))

## [1.4.0](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v1.3.5...v1.4.0) (2020-03-29)


### Bug Fixes

* **plugin-code:** additonal error checking/fail gracefully code ([808aba6](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/808aba61d32455ba0f31ec26eaefb0ce65686e93))

### Documentation

* **changeloge:** fix link (to a commit) ([6ff8357](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/6ff8357503d8722d2c74698bf3d479e322eb2357))

* **readme:** add homebridge:verified badge ([55cd18](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/55cd1815ae28146b585e22fe44b3049eda36d734))

## [1.3.5](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v1.3.4...v1.3.5) (2020-03-28)


### Bug Fixes

* **plugin-code:** if plugin has no config, return ([a2d5efa](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/a2d5efa3742519f998449dcfb53d07fa27e28c53))

### Documentation

* **readme:** update badges (MIT, PayPal) ([ee629c7](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/ee629c7d7e209d0bba3837a0c8c5727f8416f6fd))

## [1.3.4](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v1.3.3...v1.3.4) (2020-03-27)


### Bug Fixes

* **plugin-code:** plugin now fails gracefully with no config ([a046905](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/a0469055a24e30d6f446303f9f0932b65476c443]))

### Documentation

* **package.json:** bump node engine to node v10 ([f4dcebb](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/f4dcebb94bb21b71d000b16e61ffac54f325e117))

* **readme:** update homebridge link ([cace02a](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/cace02a2f34f2edf1c7cf1e4f521f310a551391f))

* **readme:** switch badges to badgen.net ([27b6fd3](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/27b6fd32a9cd76bc0384f0c377f60db78c91aec9))


## [1.3.3](https://github.com/apexad/homebridge-mysmartblinds-bridge/compare/v1.3.2...v1.3.3) (2020-03-11)


### Documentation

* **readme:** minor corrections to README.md ([296ede0](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/296ede0931e9e2dc378e0a9c802aa73945bfcaec))

* **github:** Add bug report/feature request templates ([dd0dfc2](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/dd0dfc257774c7a24aaca070d39b87921b237b3b), [4ebd272](https://github.com/apexad/homebridge-mysmartblinds-bridge/commit/4ebd272122f65d603f38c846ef68819548391517))


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
