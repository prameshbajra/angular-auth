import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpClient
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    static accessToken: string = '';
    refresh: boolean = false;
    constructor(private http: HttpClient) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const req = request.clone({
            setHeaders: {
                Authorization: `Bearer ${AuthInterceptor.accessToken}`
            }
        });
        return next.handle(req)
            .pipe(catchError((err: HttpErrorResponse) => {
                if ((err.status == 403 || err.status == 401) && !this.refresh) {
                    this.refresh = true;
                    return this.http.post('http://localhost:8000/api/refresh', {}, { withCredentials: true }).pipe(
                        switchMap((res: any) => {
                            AuthInterceptor.accessToken = res.token;
                            const req = request.clone({
                                setHeaders: {
                                    Authorization: `Bearer ${AuthInterceptor.accessToken}`
                                }
                            });
                            return next.handle(req);
                        })
                    );
                }
                this.refresh = false;
                return throwError(() => err);
            }));
    }
}
