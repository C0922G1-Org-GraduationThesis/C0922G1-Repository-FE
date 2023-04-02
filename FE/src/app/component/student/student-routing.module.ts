import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterInstructorComponent} from './register-instructor/register-instructor.component';


const routes: Routes = [
  {path: 'register-instructor', component: RegisterInstructorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
