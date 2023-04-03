import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectManagementComponent} from './project-management/project-management.component';
import {ProgressDetailComponent} from './progress-detail/progress-detail.component';


const routes: Routes = [
  {path: 'progress-management', component: ProjectManagementComponent},
  {path: 'progress-detail/:id', component: ProgressDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgressRoutingModule { }
