import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {TokenStorageService} from "../../service/token-storage.service";

@Injectable()
export class Http403Interceptor implements HttpInterceptor {
  constructor(private router: Router,
              private tokenStorageService:TokenStorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403&&!this.tokenStorageService.isLogger()) {
          // Redirect to a 403 error page or login page, or display a notification
          this.router.navigateByUrl('login');
        } else if(error.status === 403&&this.tokenStorageService.isLogger()){
          this.router.navigateByUrl('error-page/error')
        }
        return throwError(error);
      })
    );
  }
}
