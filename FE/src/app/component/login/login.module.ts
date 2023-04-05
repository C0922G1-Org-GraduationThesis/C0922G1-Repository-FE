import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { PasswordChangeComponent } from './password-change/password-change.component';


@NgModule({
  declarations: [LoginComponent, PasswordChangeComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule
    ]
})
export class LoginModule { }
