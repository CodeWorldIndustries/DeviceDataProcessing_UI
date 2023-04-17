import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, ReplaySubject, tap} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {BundleInfo} from '../models/iridium-service-plans.models';
import {ResponseModel} from '../../../core/models/base-model';

@Injectable({providedIn: 'root'})
export class IridiumServicePlansService {

    constructor(private _httpClient: HttpClient,
                private _router: Router) {
    }

    // -----------------------------------------------------------------------------------------------------
    // setter, getter, & method for the GetPromoBundlesAsync
    // -----------------------------------------------------------------------------------------------------
    private _promoBundles: ReplaySubject<BundleInfo[]> = new ReplaySubject<BundleInfo[]>(1);
    set promoBundles(value: BundleInfo[]) {
        // Store the value
        this._promoBundles.next(value);
    }
    get promoBundles$(): Observable<BundleInfo[]> {
        return this._promoBundles.asObservable();
    }
    getPromoBundles(): Observable<ResponseModel<BundleInfo[]>> {
        return this._httpClient.get<ResponseModel<BundleInfo[]>>(`${environment.apiUrl}/Iridium/ServicePlan/GetPromoBundlesAsync`).pipe(
            tap((response) => {
                this._promoBundles.next(response.data);
            })
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // setter, getter, & method for the GetShortBurstDeviceBundlesAsync
    // -----------------------------------------------------------------------------------------------------
    private _shortBurstDeviceBundles: ReplaySubject<BundleInfo[]> = new ReplaySubject<BundleInfo[]>(1);
    set shortBurstDeviceBundles(value: BundleInfo[]) {
        // Store the value
        this._shortBurstDeviceBundles.next(value);
    }
    get shortBurstDeviceBundles$(): Observable<BundleInfo[]> {
        return this._shortBurstDeviceBundles.asObservable();
    }
    getShortBurstDeviceBundles(): Observable<ResponseModel<BundleInfo[]>> {
        return this._httpClient.get<ResponseModel<BundleInfo[]>>(`${environment.apiUrl}/Iridium/ServicePlan/GetShortBurstDeviceBundlesAsync`).pipe(
            tap((response) => {
                this._shortBurstDeviceBundles.next(response.data);
            })
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // setter, getter, & method for the GetDemoAndTrialBundlesAsync
    // -----------------------------------------------------------------------------------------------------
    private _demoAndTrialBundles: ReplaySubject<BundleInfo[]> = new ReplaySubject<BundleInfo[]>(1);
    set demoAndTrialBundles(value: BundleInfo[]) {
        // Store the value
        this._demoAndTrialBundles.next(value);
    }
    get demoAndTrialBundles$(): Observable<BundleInfo[]> {
        return this._demoAndTrialBundles.asObservable();
    }
    getDemoAndTrialBundles(): Observable<ResponseModel<BundleInfo[]>> {
        return this._httpClient.get<ResponseModel<BundleInfo[]>>(`${environment.apiUrl}/Iridium/ServicePlan/GetDemoAndTrialBundlesAsync`).pipe(
            tap((response) => {
                this._demoAndTrialBundles.next(response.data);
            })
        );
    }
}
