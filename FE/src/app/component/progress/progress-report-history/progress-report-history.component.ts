import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ProgressReport} from '../../../model/progress-report';
import {HttpClient} from '@angular/common/http';
import {ProgressReportService} from '../../../service/progress-report.service';
import {PageSy} from '../../../model/page-sy';


@Component({
  selector: 'app-progress-report-history',
  templateUrl: './progress-report-history.component.html',
  styleUrls: ['./progress-report-history.component.css']
})
export class ProgressReportHistoryComponent implements OnInit {
  projectId: number;
  stageId: number;
  progressReportHistory: ProgressReport[];
  projectName: string;
  stageName: string;
  page = 0;
  progressReportPage: ProgressReport[] = [];
  teamPage!: PageSy;

  constructor(private activatedRoute: ActivatedRoute,
              private progressReportService: ProgressReportService,
              private httpClient: HttpClient) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.projectId = +paramMap.get('projectId'),
        this.stageId = +paramMap.get('stageId'),
        this.getReportHistory(this.projectId, this.stageId, this.page);

    });
  }

  ngOnInit(): void {
    this.getProgressReport();
  }

  private getReportHistory(projectId: number, stageId: number, page: number) {
    this.progressReportService.findProgressReportByProjectIdAndStageId(projectId, stageId, page).subscribe(data => {
      // @ts-ignore
      this.progressReportPage = data.content;
      // @ts-ignore
      this.teamPage = data;

    });
  }

  private getProgressReport() {
    this.progressReportService.findProgressReportMaxPercentByProjectIdAndStageId(this.projectId, this.stageId).subscribe(item => {
      this.projectName = item.project.projectName;
      this.stageName = item.stage.stageName;
    });
  }


  changePage(page: number) {
    this.getReportHistory(this.projectId, this.stageId, page);
  }
}
