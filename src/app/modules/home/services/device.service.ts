import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ResponseModel} from '../../../core/models/base-model';
import {environment} from '../../../../environments/environment';
import {IoTData} from '../models/Iot-data.model';

@Injectable({providedIn: 'root'})
export class IoTDataService {

    constructor(private _httpClient: HttpClient,
                private _router: Router) {
    }

    // -----------------------------------------------------------------------------------------------------
    // ReplaySubject
    // -----------------------------------------------------------------------------------------------------
    private _iotData: ReplaySubject<IoTData[]> = new ReplaySubject<IoTData[]>(1);

    // -----------------------------------------------------------------------------------------------------
    // sets the IoT data
    // -----------------------------------------------------------------------------------------------------
    set iotData(value: IoTData[]) {
        this._iotData.next(value);
    }

    // -----------------------------------------------------------------------------------------------------
    // gets the IoT data
    // -----------------------------------------------------------------------------------------------------
    get iotData$(): Observable<IoTData[]> {
        return this._iotData.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // submits the request to merge the JSON files
    // -----------------------------------------------------------------------------------------------------
    mergeIoTData(formData: FormData): Observable<ResponseModel<IoTData[]>> {
        return this._httpClient.post<ResponseModel<IoTData[]>>(`${environment.apiUrl}/IoT/MergeIoTDataAsync`, formData).pipe(
            tap((response) => {
                this._iotData.next(response.data);
            })
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // provides a simple and effective way to allow users to download JSON data as a file in a web application
    // -----------------------------------------------------------------------------------------------------
    downloadJSON(jsonObject: any): void {
        const data = JSON.stringify(jsonObject);
        const blob = new Blob([data], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const timestamp = Math.floor(Date.now() / 1000);
        const filename = `IoT-Data-${timestamp}.json`;
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}
