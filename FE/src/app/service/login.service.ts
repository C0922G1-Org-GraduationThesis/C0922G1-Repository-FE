import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  username = '';
  isLoggedIn: boolean;

  constructor(private http: HttpClient) {
  }

  login(obj): Observable<any> {
    return this.http.post('http://localhost:8080/api/public/login', {username: obj.username, password: obj.password});
  }
}
