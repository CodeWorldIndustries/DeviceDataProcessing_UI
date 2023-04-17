import {Base} from '../../../core/models/base-model';

export class IoTData extends Base {
    companyId: number;
    companyName: string;
    deviceId: number | null;
    deviceName: string;
    firstReadingDtm: string | null;
    lastReadingDtm: string | null;
    temperatureCount: number | null;
    averageTemperature: number | null;
    humidityCount: number | null;
    averageHumidity: number | null;
}
