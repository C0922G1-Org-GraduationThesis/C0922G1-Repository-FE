import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateTeacherComponent} from './create-teacher/create-teacher.component';
import {UpdateTeacherComponent} from './update-teacher/update-teacher.component';
import {ListTeacherComponent} from './list-teacher/list-teacher.component';
import {TeacherAdminUpdateComponent} from "./teacher-admin-update/teacher-admin-update.component";
import {TeacherAdminDetailComponent} from "./teacher-admin-detail/teacher-admin-detail.component";


const routes: Routes = [
  {path: 'create', component: CreateTeacherComponent},
  {path: 'update/:id', component: UpdateTeacherComponent},
  {path: 'list', component: ListTeacherComponent},
  {
    path: 'admin-detail/update/:teacherEmail',
    component: TeacherAdminUpdateComponent
  },
  {
    path: 'admin-detail',
    component: TeacherAdminDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {
}
