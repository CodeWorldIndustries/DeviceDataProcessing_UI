import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {IridiumServicePlansService} from '../services/iridium-service-plans.service';

@Injectable({providedIn: 'root'})
export class IridiumResolver implements Resolve<any> {

    constructor(private _iridiumServicePlansService: IridiumServicePlansService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        // Fork join multiple API endpoint calls to wait all of them to finish
        return forkJoin([
            this._iridiumServicePlansService.getDemoAndTrialBundles(),
            this._iridiumServicePlansService.getPromoBundles(),
            this._iridiumServicePlansService.getShortBurstDeviceBundles()
        ]);
    }
}
