import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateTeacherComponent} from './create-teacher/create-teacher.component';
import {UpdateTeacherComponent} from './update-teacher/update-teacher.component';


const routes: Routes = [
  {path: 'teachers/create', component: CreateTeacherComponent},
  {path: 'teachers/update/:id', component: UpdateTeacherComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {
}
