import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { RegisterTeamComponent } from './register-team/register-team.component';
import {FormsModule} from '@angular/forms';
import { InfoTeamComponent } from './info-team/info-team.component';
import { RegisterTopicComponent } from './register-topic/register-topic.component';


@NgModule({
  declarations: [RegisterTeamComponent, InfoTeamComponent, RegisterTopicComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule
  ]
})
export class StudentModule { }
