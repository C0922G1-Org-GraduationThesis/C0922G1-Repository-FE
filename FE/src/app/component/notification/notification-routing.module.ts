import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotificationTeacherCreateComponent} from './notification-teacher-create/notification-teacher-create.component';


const routes: Routes = [
  {path: 'create', component: NotificationTeacherCreateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
