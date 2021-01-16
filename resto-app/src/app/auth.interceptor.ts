import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RestoService } from './resto.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private service:RestoService,private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.get('noauth'))
    return next.handle(request.clone());
else {
    const clonedreq = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + this.service.getToken())
    });
    return next.handle(clonedreq).pipe(
        tap(
            event => { },
            err => {
                if (err.error.auth == false) {
                    this.router.navigateByUrl('/login');
                }
            })
    );
}
  }

}
