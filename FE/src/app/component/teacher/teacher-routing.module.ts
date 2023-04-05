import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeacherAdminUpdateComponent} from './teacher-admin-update/teacher-admin-update.component';
import {TeacherAdminDetailComponent} from './teacher-admin-detail/teacher-admin-detail.component';
import {PasswordChangeComponent} from '../login/password-change/password-change.component';


const routes: Routes = [
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
