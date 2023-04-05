import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherAdminUpdateComponent } from './teacher-admin-update/teacher-admin-update.component';
import { TeacherAdminDetailComponent } from './teacher-admin-detail/teacher-admin-detail.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [TeacherAdminUpdateComponent, TeacherAdminDetailComponent],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    ReactiveFormsModule
  ]
})
export class TeacherModule { }
