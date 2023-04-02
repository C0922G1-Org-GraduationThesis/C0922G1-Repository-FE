import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DocumentListCreateComponent} from './document-list-create/document-list-create.component';


const routes: Routes = [
  {path: '', component: DocumentListCreateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
