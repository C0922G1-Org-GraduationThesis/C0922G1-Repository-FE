import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProgressRoutingModule} from './progress-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ProgressDetailComponent} from './progress-detail/progress-detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from 'ckeditor4-angular';
import { ProgressReportComponent } from './progress-report/progress-report.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { ProgressReportHistoryComponent } from './progress-report-history/progress-report-history.component';






@NgModule({
  declarations: [
    ProgressDetailComponent,
    ProgressReportComponent,
    ProjectManagementComponent,
    ProgressReportHistoryComponent,
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
