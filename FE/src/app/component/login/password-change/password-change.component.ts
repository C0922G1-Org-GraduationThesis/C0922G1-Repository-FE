import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../service/token-storage.service';
import Swal from 'sweetalert2';
import {AccountService} from "../../../service/account.service";


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
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.username = this.tokenStorageService.getUser().username;
    this.formChangePassword = new FormGroup({
      username: new FormControl(this.username),
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8)])
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
}
