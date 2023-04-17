import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
    visible: boolean;
    private _jwtInterceptor: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

    // -----------------------------------------------------------------------------------------------------
    // Getter for interceptor

    constructor() {
    }

    // -----------------------------------------------------------------------------------------------------
    get jwtInterceptor$(): Observable<boolean> {
        return this._jwtInterceptor.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // intercept all request and append auth header with access token
    // -----------------------------------------------------------------------------------------------------
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                'API-SECRET-KEY': environment.apiKey
            }
        });
        return next.handle(request).pipe(finalize(() => {
                // this._progressBarService.hide();
            })
        );
    }
}
