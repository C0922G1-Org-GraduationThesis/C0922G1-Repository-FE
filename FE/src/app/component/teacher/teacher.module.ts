import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeacherRoutingModule} from './teacher-routing.module';
import {ListTeacherComponent} from './list-teacher/list-teacher.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UpdateTeacherComponent} from './update-teacher/update-teacher.component';
import {CreateTeacherComponent} from './create-teacher/create-teacher.component';
import { TeacherAdminDetailComponent } from './teacher-admin-detail/teacher-admin-detail.component';
import { TeacherAdminUpdateComponent } from './teacher-admin-update/teacher-admin-update.component';


@NgModule({
  declarations: [
    ListTeacherComponent,
    UpdateTeacherComponent,
    CreateTeacherComponent,
    TeacherAdminDetailComponent,
    TeacherAdminUpdateComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class TeacherModule {
}
