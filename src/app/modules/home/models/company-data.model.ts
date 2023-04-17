export class CompanyData {
    companyId: number;
    company: string;
    devices: Device[];
}

export class Device {
    deviceID: number;
    name: string;
    startDateTime: string;
    sensorData: Sensor[];
}

export class Sensor {
    sensorType: string;
    dateTime: string;
    value: number;
}
