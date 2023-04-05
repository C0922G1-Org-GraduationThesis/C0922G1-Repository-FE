import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProgressRoutingModule} from './progress-routing.module';
import {ProjectManagementComponent} from './project-management/project-management.component';
import {HttpClientModule} from '@angular/common/http';
import {ProgressDetailComponent} from './progress-detail/progress-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from 'ckeditor4-angular';
import { ProgressReportComponent } from './progress-report/progress-report.component';





@NgModule({
  declarations: [
    ProjectManagementComponent,
    ProgressDetailComponent,
    ProgressReportComponent
  ],
  imports: [
    CommonModule,
    ProgressRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
    FormsModule
  ]
})
export class ProgressModule {
}
