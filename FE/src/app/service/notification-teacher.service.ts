import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NotificationTeacher} from '../model/notification-teacher';

@Injectable({
  providedIn: 'root'
})
export class NotificationTeacherService {

  constructor(private httpClient: HttpClient) {
  }

  getAllNotificationTeacher(): Observable<NotificationTeacher[]> {
    return this.httpClient.get<NotificationTeacher[]>('http://localhost:8080/api/notification-teachers');
  }

  addNotificationTeacher(notificationTeacher: NotificationTeacher): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/api/notification-teachers/create-notification-teacher', notificationTeacher);
  }

}
