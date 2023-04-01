import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProListComponent} from "./pro-list/pro-list.component";


const routes: Routes = [
  {
    path: "pro",component:ProListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
