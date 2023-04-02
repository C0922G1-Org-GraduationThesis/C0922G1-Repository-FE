import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StudentCreateComponent} from './student-create/student-create.component';
import {StudentUpdateComponent} from './student-update/student-update.component';


const routes: Routes = [
  {path: 'create' , component: StudentCreateComponent},
  {path: 'update/:studentId', component: StudentUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
