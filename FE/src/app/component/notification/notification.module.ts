import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationRoutingModule} from './notification-routing.module';
import { NotificationTeacherCreateComponent } from './notification-teacher-create/notification-teacher-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [NotificationTeacherCreateComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NotificationModule {
}
