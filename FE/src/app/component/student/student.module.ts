import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StudentRoutingModule} from './student-routing.module';

import {RegisterInstructorComponent} from './register-instructor/register-instructor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StudentUpdateComponent} from './student-update/student-update.component';
import {StudentCreateComponent} from './student-create/student-create.component';


@NgModule({
  declarations: [RegisterInstructorComponent,
    StudentUpdateComponent,
    StudentCreateComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    FormsModule]
})
export class StudentModule {
}
