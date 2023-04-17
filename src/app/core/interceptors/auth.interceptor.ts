import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private _isRefreshing = false;
    private _refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private _toastrService: ToastrService) {
    }

    injectToken(request: HttpRequest<any>, token: string): any {
        return request.clone({headers: request.headers.set('authorization', `bearer ${token}`)});
    }

    // -----------------------------------------------------------------------------------------------------
    // intercept
    // -----------------------------------------------------------------------------------------------------
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(catchError((error: HttpErrorResponse) => {
                    const message = error.error?.ErrorMessage ?? error?.statusText ?? 'Oh snap! an unknown error has occurred.';
                    this._toastrService.error(message);
                    return throwError(message);
                })
            );
    }
}
