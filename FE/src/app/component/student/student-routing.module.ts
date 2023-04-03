import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StudentListComponent} from './student-list/student-list.component';
import {StudentInstructorComponent} from './student-instructor/student-instructor.component';


const routes: Routes = [
  {path: '', component: StudentListComponent},
  {path: 'acb', component: StudentInstructorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
