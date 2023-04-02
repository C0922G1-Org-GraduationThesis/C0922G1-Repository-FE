import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TeacherRoutingModule} from './teacher-routing.module';
import {CreateTeacherComponent} from './create-teacher/create-teacher.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UpdateTeacherComponent} from './update-teacher/update-teacher.component';


@NgModule({
  declarations: [CreateTeacherComponent, UpdateTeacherComponent],
    imports: [
        CommonModule,
        TeacherRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class TeacherModule {
}
