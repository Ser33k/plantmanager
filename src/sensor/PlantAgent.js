class PlantAgent {

    SENSOR_SERVICE = 0xfff0;
    HUMIDITY_CHARACTERISTIC = 'd7e84cb2-ff37-4afc-9ed8-5577aeb8454c';
    BLE_DEVICE_NAME = 'PlantAgent';

    constructor() {
        this.device = null;
        this.onDisconnected = this.onDisconnected.bind(this);
    }

    request() {
        let options = {
            "filters": [{
                "name": this.BLE_DEVICE_NAME,
                "services": [this.SENSOR_SERVICE]
            }]
        };
        return navigator.bluetooth.requestDevice(options)
            .then(device => {
                this.device = device;
                this.device.addEventListener('gattserverdisconnected', this.onDisconnected);
            });
    }

    connect() {
        if (!this.device) {
            return Promise.reject('Device is not connected.');
        }
        return this.device.gatt.connect();
    }

    startHumidityNotifications(listener) {
        return this.device.gatt.getPrimaryService(this.SENSOR_SERVICE)
            .then(service => service.getCharacteristic(this.HUMIDITY_CHARACTERISTIC))
            .then(characteristic => characteristic.startNotifications())
            .then(characteristic => characteristic.addEventListener('characteristicvaluechanged', listener));
    }

    stopHumidityNotifications(listener) {
        return this.device.gatt.getPrimaryService(this.SENSOR_SERVICE)
            .then(service => service.getCharacteristic(this.HUMIDITY_CHARACTERISTIC))
            .then(characteristic => characteristic.stopNotifications())
            .then(characteristic => characteristic.removeEventListener('characteristicvaluechanged', listener));
    }

    disconnect() {
        if (!this.device) {
            return Promise.reject('Device is not connected.');
        }
        return this.device.gatt.disconnect();
    }

    onDisconnected() {
        console.log('Device is disconnected.');
    }
}
