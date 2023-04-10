import {Component, OnInit} from '@angular/core';
import {TeacherService} from '../../../service/teacher.service';
import {TokenStorageService} from '../../../service/token-storage.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Teacher} from '../../../model/teacher';
import {Admin} from '../../../model/admin';
import {errorObject} from 'rxjs/internal-compatibility';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-admin-update',
  templateUrl: './teacher-admin-update.component.html',
  styleUrls: ['./teacher-admin-update.component.css']
})
/**
 * Created by: Phạm Tiến
 * Date: 29/03/2023
 * Component: TeacherAdminUpdateComponent
 */
export class TeacherAdminUpdateComponent implements OnInit {
  emailUpdate: string;
  adminUpdate: Teacher;
  formAdminUpdate?: FormGroup;
  admin: Admin;

  constructor(private teacherService: TeacherService,
              private tokenStorageService: TokenStorageService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paraMap: ParamMap) => {
      this.emailUpdate = paraMap.get('teacherEmail');
    });
  }

  ngOnInit(): void {
    this.teacherService.findTeacherByEmail(this.emailUpdate).subscribe(next => {
      this.adminUpdate = next;
      this.formAdminUpdate = new FormGroup({
        teacherId: new FormControl(this.adminUpdate.teacherId),
        teacherName: new FormControl(this.adminUpdate.teacherName, [Validators.required,
          Validators.pattern('^[^0-9!@#$%^&*()_+-=]+$'),
          Validators.maxLength(50), Validators.minLength(3)]),
        teacherEmail: new FormControl(this.adminUpdate.teacherEmail, [Validators.required, Validators.email]),
        teacherPhoneNumber: new FormControl(this.adminUpdate.teacherPhoneNumber,
          [Validators.required, Validators.pattern('^(090[0-9]{7}|093[0-9]{7}|097[0-9]{7})$')]),
        teacherAddress: new FormControl(this.adminUpdate.teacherAddress,
          [Validators.required, Validators.minLength(5), Validators.maxLength(75)]),
      });
    });
  }


  updateAdmin() {
    this.admin = this.formAdminUpdate.value;
    console.log(this.admin);
    this.teacherService.updateAdmin(this.admin).subscribe(
      next => {
        this.router.navigateByUrl("teachers/admin-detail")
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
          title: 'Thay đổi thông tin thành công'
        });
      });
  }

  comeback() {
    this.router.navigateByUrl('');
  }
}
