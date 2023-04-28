import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../service/token-storage.service';
import Swal from 'sweetalert2';
import {AccountService} from "../../../service/account.service";
import {PasswordChangeService} from "../../../service/password-change.service";


@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {
  formChangePassword?: FormGroup;
  username?: string;
  account?: Account;
  role?: string;

  constructor(private route: Router,
              private accountService: AccountService,
              private tokenStorageService: TokenStorageService,
              private passwordChangeService: PasswordChangeService) {
  }

  ngOnInit(): void {
    this.username = this.tokenStorageService.getUser().username;
    this.formChangePassword = new FormGroup({
      username: new FormControl(this.username),
      oldPassword: new FormControl('', [Validators.required, this.keditorMinLengthValidator(8)]),
      newPassword: new FormControl('', [Validators.required, this.keditorMinLengthValidator(8)]),
      passwordConfirm: new FormControl('', [Validators.required,])
    });
  }

  changePassword() {
    this.account = this.formChangePassword.value;
    this.accountService.changePassword(this.account).subscribe(next => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });
        Toast.fire({
          icon: 'success',
          title: 'Thay đổi mật khẩu thành công'
        });
        this.tokenStorageService.signOut();
        this.route.navigateByUrl('login');
        this.passwordChangeService.passwordChanged();
      },
      object => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });
        Toast.fire({
          icon: 'error',
          title: 'Thay đổi mật khẩu không thành công'
        });
        for (const err of object.error) {
          this.formChangePassword.controls[err.field].setErrors({errorOldPasswordWrong: err.defaultMessage});
        }
      });
  }

  keditorMaxLengthValidator(maxLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const contentLength = control.value.replace(/<[^>]*>/g, '').length;
      return contentLength > maxLength ? {'ckeditorMinLength': {value: control.value}} : null;
    };
  }

  keditorMinLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const contentLength = control.value.replace(/<[^>]*>/g, '').length;
      return contentLength < minLength ? {'ckeditorMinLength': {value: control.value}} : null;
    };
  }
}
