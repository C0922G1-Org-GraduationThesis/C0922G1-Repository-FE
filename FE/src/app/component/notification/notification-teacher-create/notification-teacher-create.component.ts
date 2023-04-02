import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NotificationTeacherService} from '../../../service/notification-teacher.service';
import {NotificationTeacher} from '../../../model/notification-teacher';

@Component({
  selector: 'app-notification-teacher-create',
  templateUrl: './notification-teacher-create.component.html',
  styleUrls: ['./notification-teacher-create.component.css']
})
export class NotificationTeacherCreateComponent implements OnInit {

  formNotificationTeacher: FormGroup = new FormGroup({
    notificationTeacherTopic: new FormControl(),
    notificationTeacherContent: new FormControl(),
  })

  constructor(private notificationTeacherService: NotificationTeacherService,) { }

  ngOnInit(): void {
  }

  createNotificationTeacher() {
    const notificationTeacher: NotificationTeacher = this.formNotificationTeacher.value;
    this.notificationTeacherService.addNotificationTeacher(notificationTeacher).subscribe(next => {
      alert('Thêm mới thành công');
    })
  }
}
