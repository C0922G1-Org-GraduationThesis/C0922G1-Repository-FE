import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressRoutingModule } from './progress-routing.module';
import { QuestionListComponent } from './question-list/question-list.component';
import {HttpClientModule} from '@angular/common/http';
import { ComponentCreateComponent } from './component-create/component-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [QuestionListComponent, ComponentCreateComponent],
  imports: [
    CommonModule,
    ProgressRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProgressModule { }
