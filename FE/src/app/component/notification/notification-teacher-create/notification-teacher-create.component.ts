import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationTeacher} from '../../../model/notification-teacher';
import {Teacher} from '../../../model/teacher';
import {NotificationTeacherService} from "../../../service/notification-teacher.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-notification-teacher-create',
  templateUrl: './notification-teacher-create.component.html',
  styleUrls: ['./notification-teacher-create.component.css']
})
export class NotificationTeacherCreateComponent implements OnInit {

  formNotificationTeacher: FormGroup = new FormGroup({
    notificationTeacherTopic: new FormControl('',[Validators.required]),
    notificationTeacherContent: new FormControl('',[Validators.required,Validators.pattern("")]),
  });
  errCreate: any = {
    notificationTeacherTopic: '',
    notificationTeacherContent: ''
  }


  constructor(private notificationTeacherService: NotificationTeacherService,
              private route: Router) {
  }

  ngOnInit(): void {
  }

  createNotificationTeacher() {
    const notificationTeacher: NotificationTeacher = this.formNotificationTeacher.value;
    this.notificationTeacherService.addNotificationTeacher(notificationTeacher).subscribe(next => {
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
      this.route.navigateByUrl('/');
      Toast.fire({
        icon: 'success',
        title: 'Đăng thông báo thành công'
      });
    },er => {
      console.log(er);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < er.error.length; i++) {
        if (er.error[i].field === 'notificationTeacherTopic') {
          this.errCreate.notificationTeacherTopic = er.error[i].defaultMessage;
        } else if (er.error[i].field === 'notificationTeacherContent') {
          this.errCreate.notificationTeacherContent = er.error[i].defaultMessage;
        }
      }
    });
  }
}
