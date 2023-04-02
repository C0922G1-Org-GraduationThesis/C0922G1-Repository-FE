import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeacherRoutingModule} from './teacher-routing.module';
import {ListTeacherComponent} from './list-teacher/list-teacher.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [ListTeacherComponent, ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
  ]
})
export class TeacherModule {
}
