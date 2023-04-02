import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListTeacherComponent} from './list-teacher/list-teacher.component';


const routes: Routes = [
  {path: 'teachers/list', component: ListTeacherComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {
}
