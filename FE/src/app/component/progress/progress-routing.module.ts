import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProgressReportComponent} from "./progress-report/progress-report.component";
import {ProgressReportHistoryComponent} from "./progress-report-history/progress-report-history.component";
import {StudentProgressReportComponent} from "./student-progress-report/student-progress-report.component";
import {CommonModule, DatePipe} from "@angular/common";


const routes: Routes = [{
  path: "report/:1/:1",
  component: ProgressReportComponent
}, {
  path: "history/:projectId/:stageId",
  component: ProgressReportHistoryComponent
}, {
  path: "student-report/:1",
  component: StudentProgressReportComponent
},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DatePipe],
  declarations: [],
})
export class ProgressRoutingModule {
}
