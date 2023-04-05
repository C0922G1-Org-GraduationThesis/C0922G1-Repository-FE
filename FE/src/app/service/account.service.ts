import { Injectable } from '@angular/core';
import {Admin} from '../model/admin';
import {Observable} from 'rxjs';
import {Teacher} from '../model/teacher';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }
  changePassword(account: Account): Observable<Teacher> {
    return this.http.patch<Admin>('http://localhost:8080/api/public/change-password', account);
  }
}
