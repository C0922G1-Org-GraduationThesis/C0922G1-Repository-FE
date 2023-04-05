import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentDetailComponent} from './student-detail/student-detail.component';


const routes: Routes = [
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
