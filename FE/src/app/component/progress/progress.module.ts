import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProgressRoutingModule} from './progress-routing.module';
import {ProgressReportComponent} from './progress-report/progress-report.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProgressReportHistoryComponent} from './progress-report-history/progress-report-history.component';
import {StudentProgressReportComponent} from './student-progress-report/student-progress-report.component';
import {HttpClientModule} from "@angular/common/http";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [ProgressReportComponent, ProgressReportHistoryComponent, StudentProgressReportComponent],
  imports: [
    CommonModule,
    ProgressRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ProgressModule {
}
