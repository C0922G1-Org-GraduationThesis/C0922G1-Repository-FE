import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { StudentCreateComponent } from './student-create/student-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import { StudentUpdateComponent } from './student-update/student-update.component';


@NgModule({
  declarations: [StudentCreateComponent, StudentUpdateComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
