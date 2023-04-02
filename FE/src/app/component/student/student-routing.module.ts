import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterTeamComponent} from './register-team/register-team.component';
import {InfoTeamComponent} from './info-team/info-team.component';
import {RegisterTopicComponent} from './register-topic/register-topic.component';


const routes: Routes = [
  {
    path: 'register-team',
    component: RegisterTeamComponent
  },
  {
    path: 'info-team',
    component: InfoTeamComponent
  },
  {
    path: 'register-topic',
    component: RegisterTopicComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
