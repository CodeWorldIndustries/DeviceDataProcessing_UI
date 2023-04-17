import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, ReplaySubject, tap} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {
    UpdateDeviceStatusRequest,
    UpdateDeviceStatusResponse
} from '../models/iridium-device.models';
import {ResponseModel} from '../../../core/models/base-model';

@Injectable({providedIn: 'root'})
export class IridiumDeviceService {

    constructor(private _httpClient: HttpClient,
                private _router: Router) {
    }

    // -----------------------------------------------------------------------------------------------------
    // setter, getter, & method for the UpdateDeviceStatusResponse
    // -----------------------------------------------------------------------------------------------------
    private _updateDeviceStatusResponse: ReplaySubject<UpdateDeviceStatusResponse> = new ReplaySubject<UpdateDeviceStatusResponse>(1);
    set updateDeviceStatusResponse(value: UpdateDeviceStatusResponse) {
        // Store the value
        this._updateDeviceStatusResponse.next(value);
    }
    get updateDeviceStatusResponse$(): Observable<UpdateDeviceStatusResponse> {
        return this._updateDeviceStatusResponse.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // updateIridiumDeviceStatus
    // -----------------------------------------------------------------------------------------------------
    updateIridiumDeviceStatus(request: UpdateDeviceStatusRequest): Observable<ResponseModel<UpdateDeviceStatusResponse>> {
        return this._httpClient.put<ResponseModel<UpdateDeviceStatusResponse>>(`${environment.apiUrl}/Iridium/Device/UpdateDeviceStatusAsync`, request).pipe(
            tap((response) => {
                this._updateDeviceStatusResponse.next(response.data);
            })
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // ActivateSubscriberResponse
    // -----------------------------------------------------------------------------------------------------
    activateDevice(request: string[]): Observable<ResponseModel<UpdateDeviceStatusResponse>> {
        return this._httpClient.post<ResponseModel<UpdateDeviceStatusResponse>>(`${environment.apiUrl}/Iridium/Device/ActivateDevicesAsync`, request).pipe(
            tap((response) => {
                this._updateDeviceStatusResponse.next(response.data);
            })
        );
    }
}
