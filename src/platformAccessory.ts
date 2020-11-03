/* eslint-disable @typescript-eslint/no-this-alias */
import {
  Service,
  PlatformAccessory,
  CharacteristicValue,
  CharacteristicSetCallback,
  CharacteristicGetCallback,
} from 'homebridge';
import request from 'request-promise';
import { MySmartBlindsBridgePlatform } from './platform';
import {
  MYSMARTBLINDS_QUERIES,
} from './settings';

export class MySmartBlindsAccessory {
  private service!: Service;
  currentPosition: number;
  statusLog: boolean;
  positionState: string | number;
  batteryLevel: string;
  targetPosition: number;
  name: string;
  closeUp: boolean;
  macAddress: string;

  constructor(
    private readonly platform: MySmartBlindsBridgePlatform,
    private readonly accessory: PlatformAccessory,
  ) {
    this.platform = platform;
    this.name = accessory.context.blind.name;
    this.macAddress = accessory.context.blind.macAddress;
    this.currentPosition = accessory.context.blind.blindPosition;
    this.batteryLevel = accessory.context.blind.batteryLevel;
    this.targetPosition = accessory.context.blind.blindPosition;
    this.positionState = this.platform.Characteristic.PositionState.STOPPED;
    this.statusLog = platform.config.statusLog || false;
    this.closeUp = platform.config.closeUp || false;

    accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'MySmartBlinds')
      .setCharacteristic(this.platform.Characteristic.Model, 'Blind')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, this.macAddress);

    this.service = accessory.getService(this.platform.Service.WindowCovering)
    || accessory.addService(this.platform.Service.WindowCovering);
    this.service.setCharacteristic(this.platform.Characteristic.Name, this.name);

    this.service.getCharacteristic(this.platform.Characteristic.CurrentPosition)
      .on('get', this.getCurrentPosition.bind(this));

    this.service.getCharacteristic(this.platform.Characteristic.TargetPosition)
      .on('get', this.getTargetPosition.bind(this))
      .on('set', this.setTargetPosition.bind(this));

    this.service.getCharacteristic(this.platform.Characteristic.PositionState)
      .on('get', this.getPositionState.bind(this));

    const batteryService = accessory.getService(`${this.name} Battery`) ||
    accessory.addService(
      this.platform.Service.BatteryService,
      `${this.name} Battery`,
      `${this.macAddress} Battery`,
    );
    
    batteryService.getCharacteristic(this.platform.Characteristic.BatteryLevel)
      .setProps({ maxValue: 100, minValue: 0, minStep: 1 })
      .on('get', this.getBatteryLevel.bind(this));

    batteryService.getCharacteristic(platform.Characteristic.StatusLowBattery)
      .on('get', this.getStatusLowBattery.bind(this));
    
    this.accessory = accessory;
  }

  getCurrentPosition(callback: CharacteristicGetCallback) {
    // using cached current position, rather than fetching actual current position via the API
    let reportCurrentPosition = this.currentPosition as number;

    const check99 = reportCurrentPosition === 99;
    if (check99) {
      reportCurrentPosition = 100;
    }

    const check1 = reportCurrentPosition === 1;
    if (check1) {
      reportCurrentPosition = 0;
    }
    if (this.statusLog) {
      this.platform.log.info(`STATUS: ${this.name} getCurrentPosition : ${reportCurrentPosition}${check99
        ? ` (Actual ${this.currentPosition})` : ''}`,
      );
    }
    callback(null, reportCurrentPosition);
  }

  getTargetPosition(callback: CharacteristicGetCallback) {
    let reportTargetPosition = this.targetPosition;

    const check99 = reportTargetPosition === 99;
    if (check99) {
      reportTargetPosition = 100;
    }

    const check1 = reportTargetPosition === 1;
    if (check1) {
      reportTargetPosition = 0;
    }

    if (this.statusLog) {
      this.platform.log.info(
        `STATUS: ${this.name} getTargetPosition : ${reportTargetPosition}${check99 ? ` (Actual ${this.targetPosition})` : ''}`,
      );
    }
    this.service.setCharacteristic(this.platform.Characteristic.PositionState, this.platform.Characteristic.PositionState.STOPPED);
    callback(null, reportTargetPosition);
  }

  getPositionState(callback: CharacteristicGetCallback) {
    this.platform.log.info(`${this.name} getPositionState : ${this.positionState}`);
    callback(null, this.positionState);
  }

  getBatteryLevel(callback: CharacteristicGetCallback) {
    // using cached battery level, rather than fetching actual level, updated after target position changed
    callback(null, parseFloat(this.batteryLevel));
  }

  getStatusLowBattery(callback: CharacteristicGetCallback) {
    // value of -1 means data was not sent correctly, so ignore it for now
    callback(
      null,
      (parseFloat(this.batteryLevel) < 20 && parseFloat(this.batteryLevel) !== -1)
        ? this.platform.Characteristic.StatusLowBattery.BATTERY_LEVEL_LOW
        : this.platform.Characteristic.StatusLowBattery.BATTERY_LEVEL_NORMAL,
    );
  }

  setTargetPosition(value: CharacteristicValue, callback: CharacteristicSetCallback) {
    const thisBlind = this;
    thisBlind.targetPosition = value as number;

    thisBlind.platform.log.info(`${thisBlind.name} setTargetPosition from ${thisBlind.currentPosition} to ${thisBlind.targetPosition}`);

    request(Object.assign(
      thisBlind.platform.requestOptions,
      {
        body: {
          query: MYSMARTBLINDS_QUERIES.UpdateBlindsPosition,
          variables: {
            position: thisBlind.closeUp ? (Math.abs(thisBlind.targetPosition - 200)) : thisBlind.targetPosition,
            blinds: this.macAddress,
          },
        },
      },
    ))
      .then((response) => {
      // update battery level since we jusr ran the motor a bit
        thisBlind.batteryLevel = response.data.updateBlindsPosition[0].batteryLevel;
        thisBlind.currentPosition = thisBlind.targetPosition;
        thisBlind.service.setCharacteristic(thisBlind.platform.Characteristic.CurrentPosition, thisBlind.currentPosition);
        thisBlind.service.setCharacteristic(
          thisBlind.platform.Characteristic.PositionState,
          thisBlind.platform.Characteristic.PositionState.STOPPED,
        );
        thisBlind.platform.log.info(`${thisBlind.name} currentPosition is now ${thisBlind.currentPosition}`);
        callback(null);
      })
      .catch((err) => {
        thisBlind.platform.log.error(`${thisBlind.name} setTargetPosition ERROR`, err);
        callback(null);
      });
  }
}
