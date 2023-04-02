import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectDetailComponent} from './project-detail/project-detail.component';


const routes: Routes = [
  {path: 'list', component: ProjectListComponent},
  {path: 'detail/:id', component: ProjectDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
