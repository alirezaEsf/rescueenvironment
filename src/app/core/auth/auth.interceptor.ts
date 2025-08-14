import { HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { catchError, map, Observable, throwError } from 'rxjs';
import { FuseLoadingService } from '../../../@fuse/services/loading';
import { TranslocoService } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Intercept
 *
 * @param req
 * @param next
 */
export const authInterceptor = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
    console.log('&&&&&&&&&&&&&&&&&&&');
    const authService = inject(AuthService);
    const fuseLoadingService = inject(FuseLoadingService);
    const translocoService = inject(TranslocoService);
    const router = inject(Router);
    const _snackBar = inject(MatSnackBar);

    // Clone the request object
    let newReq = req.clone();

    if (
        authService.accessToken &&
        !AuthUtils.isTokenExpired(authService.accessToken)
    ) {
        newReq = req.clone({
            headers: req.headers.set(
                'Authorization',
                'Bearer ' + authService.accessToken,
            ),
        });
    }

    // Response
    return next(newReq).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                if (event.body.length == 0
                    && !req.url.includes('api/apibymoduleidhasntclient')
                    && !req.url.includes('mediator/findbyapiid')
                    && !req.url.includes('api/encodedetail/findbyapiid')
                    && !req.url.includes('api/matchnode/getmatchnodebysequenceid')
                    && !req.url.includes('statistic/today')
                    && !req.url.includes('apifee/search')
                    && !req.url.includes('statistic/today')
                    && !req.url.includes('statistic/compare/ty')
                    && !req.url.includes('statistic/compare/yt')
                    && !req.url.includes('iplimit/findbyendpointid')) {
                    fuseLoadingService.hide();
                    _snackBar.open('اطلاعاتی یافت نشد!', ' ',
                        {
                            panelClass: 'panel-snackbar-warning',
                            duration: 5000,
                            verticalPosition: 'top',
                            horizontalPosition: 'center',
                            direction: 'rtl',
                        });
                }
                if (event.status === 204) {
                    fuseLoadingService.hide();
                    _snackBar.open('اطلاعاتی برای نمایش یافت نشد!', ' ',
                        {
                            panelClass: 'panel-snackbar-warning',
                            duration: 5000,
                            verticalPosition: 'top',
                            horizontalPosition: 'center',
                            direction: 'rtl',
                        });
                    return;
                }

            }
            return event;
        }),
        catchError((error) => {
            // Catch "401 Unauthorized" responses
            fuseLoadingService.hide();
            switch (error.status) {
                case 400: {
                    if (error ? error?.error?.text : false) {
                        debugger
                        _snackBar.open(error.error.text, ' ',
                            {
                                panelClass: 'panel-snackbar-error',
                                duration: 5000,
                                verticalPosition: 'top',
                                horizontalPosition: 'center',
                                direction: 'rtl',
                            });
                    } else {
                        _snackBar.open(translocoService.translate('label.http.status.400'), ' ',
                            {
                                panelClass: 'panel-snackbar-error',
                                duration: 5000,
                                verticalPosition: 'top',
                                horizontalPosition: 'center',
                                direction: 'rtl',
                            });
                    }

                }
                    break;
                case (401):
                    if (error ? error?.error?.text : false) {
                        _snackBar.open(error.error.text, ' ',
                            {
                                panelClass: 'panel-snackbar-error',
                                duration: 5000,
                                verticalPosition: 'top',
                                horizontalPosition: 'center',
                                direction: 'rtl',
                            });
                    } else {
                        _snackBar.open(translocoService.translate('label.http.status.401'), ' ',
                            {
                                panelClass: 'panel-snackbar-error',
                                duration: 5000,
                                verticalPosition: 'top',
                                horizontalPosition: 'center',
                                direction: 'rtl',
                            });
                    }
                    router.navigate(['/login']);
                    break;
                case (404):
                    _snackBar.open(translocoService.translate('label.http.status.404'), ' ',
                        {
                            panelClass: 'panel-snackbar-error',
                            duration: 5000,
                            verticalPosition: 'top',
                            horizontalPosition: 'center',
                            direction: 'rtl',
                        });
                    break;
                case (0):
                    _snackBar.open(translocoService.translate('label.http.status.0'), ' ',
                        {
                            panelClass: 'panel-snackbar-error',
                            duration: 5000,
                            verticalPosition: 'top',
                            horizontalPosition: 'center',
                            direction: 'rtl',
                        });
                    break;
                case (500): {
                    if (error ? error?.error?.text : false) {

                        _snackBar.open(error.error.text, ' ',
                            {
                                panelClass: 'panel-snackbar-error',
                                duration: 5000,
                                verticalPosition: 'top',
                                horizontalPosition: 'center',
                                direction: 'rtl',
                            });
                    } else {
                        _snackBar.open(translocoService.translate('label.http.status.500'), ' ',
                            {
                                panelClass: 'panel-snackbar-error',
                                duration: 5000,
                                verticalPosition: 'top',
                                horizontalPosition: 'center',
                                direction: 'rtl',
                            });
                    }

                }
                    break;
            }

            // if (error instanceof HttpErrorResponse && error.status === 401) {
            //     // Sign out
            //     authService.signOut();
            //
            //     // Reload the app
            //     location.reload();
            // }

            return throwError(error);
        }),
    );
};
