import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StudentRoutingModule} from './student-routing.module';

import {RegisterInstructorComponent} from './register-instructor/register-instructor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StudentUpdateComponent} from './student-update/student-update.component';
import {StudentCreateComponent} from './student-create/student-create.component';
import {RegisterTopicComponent} from './register-topic/register-topic.component';
import {RegisterTeamComponent} from './register-team/register-team.component';
import {InfoTeamComponent} from './info-team/info-team.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentInstructorComponent } from './student-instructor/student-instructor.component';


@NgModule({
  declarations: [RegisterInstructorComponent,
    StudentUpdateComponent,
    StudentCreateComponent,
    RegisterTeamComponent,
    RegisterTopicComponent,
    RegisterTeamComponent,
    InfoTeamComponent,
    StudentListComponent,
    StudentInstructorComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    FormsModule]
})
export class StudentModule {
}
