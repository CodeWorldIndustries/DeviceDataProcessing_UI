import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, ReplaySubject, tap} from 'rxjs';
import {DataSummaryViewModel, GetDataSummaryRequest} from './dashboard.models';
import {DateTime} from 'luxon';
import * as _ from 'lodash';
import {DataPoint} from '../../core/models/data-point.model';
import {ResponseModel} from '../../core/models/base-model';
import {environment} from '../../../environments/environment';
import {IoTData} from '../home/models/Iot-data.model';

@Injectable({providedIn: 'root'})
export class DashboardService {
    private _data: ReplaySubject<IoTData[]> = new ReplaySubject<IoTData[]>(1);

    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // setter for the DailyUsageSummaryViewModel
    // -----------------------------------------------------------------------------------------------------
    set data(value: IoTData[]) {
        this._data.next(value);
    }

    // -----------------------------------------------------------------------------------------------------
    // getter for the DailyUsageSummaryViewModel
    // -----------------------------------------------------------------------------------------------------
    get data$(): Observable<IoTData[]> {
        return this._data.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // gets the data usage by day
    // -----------------------------------------------------------------------------------------------------
    getData(request: GetDataSummaryRequest = null): Observable<any> {
        const query = !request?.from && !request?.to ? `` : `?From=${request.from}&To=${request.to}`;
        return this._httpClient.get<ResponseModel<IoTData[]>>(`${environment.apiUrl}/IoT/GetDataAsync${query}`).pipe(
            tap((response) => {
                this._data.next(response.data);
            })
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // converts daily usage to data points
    // -----------------------------------------------------------------------------------------------------
    convertHumidityToDataPoints(data: IoTData[]): DataPoint<Date>[] {
        const dataPoints: DataPoint<Date>[] = [];
        _.forEach(data, (x) => {
            dataPoints.push({x: DateTime.fromISO(x.createdDate).toJSDate(), y: x.averageHumidity});
        });
        return dataPoints;
    }

    // -----------------------------------------------------------------------------------------------------
    // converts daily usage to data points
    // -----------------------------------------------------------------------------------------------------
    convertTemperatureToDataPoints(data: IoTData[]): DataPoint<Date>[] {
        const dataPoints: DataPoint<Date>[] = [];
        _.forEach(data, (x) => {
            dataPoints.push({x: DateTime.fromISO(x.createdDate).toJSDate(), y: x.averageTemperature});
        });
        return dataPoints;
    }
}
