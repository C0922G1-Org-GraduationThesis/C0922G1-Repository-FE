import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentDetailComponent } from './student-detail/student-detail.component';


@NgModule({
  declarations: [StudentDetailComponent],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
