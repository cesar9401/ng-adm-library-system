import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class UnauthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (e: HttpErrorResponse | any) => {
          if (e instanceof HttpErrorResponse && e.status === 401) {
            // TODO: logout here
          }
        }
      })
    );
  }
}
