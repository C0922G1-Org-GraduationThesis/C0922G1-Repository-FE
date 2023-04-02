import {Component, OnInit} from '@angular/core';
import {NotificationTeacherService} from '../../../service/notification-teacher.service';
import {NotificationTeacher} from '../../../model/notification-teacher';

@Component({
  selector: 'app-infomation-guild',
  templateUrl: './infomation-guild.component.html',
  styleUrls: ['./infomation-guild.component.css']
})
export class InfomationGuildComponent implements OnInit {
  notificationTeacherList: NotificationTeacher[];
  constructor(private notificationTeacherService: NotificationTeacherService) {
  }

  ngOnInit(): void {
    this.notificationTeacherService.getAllNotificationTeacher().subscribe(item => {
      console.log(item);
      this.notificationTeacherList = item;
    });
  }

}
