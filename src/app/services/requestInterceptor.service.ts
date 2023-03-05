import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor{
  token:string|any
  constructor() {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(localStorage.getItem('accessToken')) {
      this.token = localStorage.getItem('accessToken');
      let jwtTokem = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        }
      });
      return next.handle(jwtTokem);
    }
    return next.handle(req);
  }

}
