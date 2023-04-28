import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PasswordChangeService {
  private passwordChangedSubject = new Subject();

  constructor() {
  }

  passwordChanged$ = this.passwordChangedSubject.asObservable();

  passwordChanged() {
    this.passwordChangedSubject.next();
  }
}
