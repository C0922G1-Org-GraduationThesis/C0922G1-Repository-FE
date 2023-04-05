import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../../service/token.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ShareService} from '../../../service/share.service';
import {TokenStorageService} from '../../../service/token-storage.service';
import {LoginService} from '../../../service/login.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  username = String;
  errorMessage = '';
  roles: string[] = [];
  returnUrl: string;
  rememberMe: boolean;

  constructor(private tokenStorageService: TokenStorageService,
              private authService: LoginService,
              private router: Router,
              private route: ActivatedRoute,
              private shareService: ShareService) {
  }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      rememberMe: new FormControl(false)

    });

    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.authService.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
    // this.returnUrl = this.route.snapshot.queryParams[' returnUrl'] || '/login';
  }

  onSubmit() {
    this.authService.login(this.formLogin.value).subscribe(
      data => {
        if (this.formLogin.value.rememberMe) {
          this.tokenStorageService.saveTokenLocal(data.accessToken);
          this.tokenStorageService.saveUserLocal(data);
        } else {
          this.tokenStorageService.saveTokenSession(data.accessToken);
          this.tokenStorageService.saveUserLocal(data);
        }

        this.authService.isLoggedIn = true;
        this.username = this.tokenStorageService.getUser().username;
        this.roles = this.tokenStorageService.getUser().roles;
        this.formLogin.reset();
        this.router.navigateByUrl(this.returnUrl);
        this.shareService.sendClickEvent();

      },
      err => {
        this.authService.isLoggedIn = false;
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
          title: 'Tên đăng nhập hoặc mật khẩu không đúng'
        });
      }
    );
  }
}
