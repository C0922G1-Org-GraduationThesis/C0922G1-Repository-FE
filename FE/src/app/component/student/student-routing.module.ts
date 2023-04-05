import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterInstructorComponent} from './register-instructor/register-instructor.component';
import {StudentCreateComponent} from './student-create/student-create.component';
import {StudentUpdateComponent} from './student-update/student-update.component';
import {RegisterTeamComponent} from './register-team/register-team.component';
import {InfoTeamComponent} from './info-team/info-team.component';
import {RegisterTopicComponent} from './register-topic/register-topic.component';
import {StudentListComponent} from './student-list/student-list.component';
import {StudentInstructorComponent} from "./student-instructor/student-instructor.component";
import {StudentDetailComponent} from "./student-detail/student-detail.component";


const routes: Routes = [
  {path: 'create' , component: StudentCreateComponent},
  {path: 'update/:studentId', component: StudentUpdateComponent},
  {path: 'register-instructor', component: RegisterInstructorComponent},
  {
    path: 'register-team',
    component: RegisterTeamComponent
  },
  {
    path: 'info-team/:teamId',
    component: InfoTeamComponent
  },
  {
    path: 'register-topic/:teamId',
    component: RegisterTopicComponent
  },
  {
    path: 'list',
    component: StudentListComponent
  },
  {path: 'instructor',
    component: StudentInstructorComponent},
  {
    path: 'detail',
    component: StudentDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
