import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {NavigationService} from 'app/core/navigation/navigation.service';

@Injectable({
    providedIn: 'root'
})
export class InitialDataResolver implements Resolve<any> {

    constructor(private _navigationService: NavigationService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        // Fork join multiple API endpoint calls to wait all of them to finish
        return forkJoin([
            this._navigationService.get()
        ]);
    }
}
