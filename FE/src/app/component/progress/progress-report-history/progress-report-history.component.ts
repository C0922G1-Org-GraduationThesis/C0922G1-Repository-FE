import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ProgressReport} from '../../../model/progress-report';
import {HttpClient} from '@angular/common/http';
import {ProgressReportService} from '../../../service/progress-report.service';
import {PageProgressReport} from '../../../model/page-progress-report';


@Component({
  selector: 'app-progress-report-history',
  templateUrl: './progress-report-history.component.html',
  styleUrls: ['./progress-report-history.component.css']
})
export class ProgressReportHistoryComponent implements OnInit {
  projectId: number;
  stageId: number;
  projectName: string;
  stageName: string;
  page = 0;
  fileNameSearch = '';
  progressReportPage: ProgressReport[] = [];
  teamPage!: PageProgressReport;
  currentPage: number;
  flag = false;

  constructor(private activatedRoute: ActivatedRoute,
              private progressReportService: ProgressReportService) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.projectId = +paramMap.get('projectId'),
        this.stageId = +paramMap.get('stageId'),
        this.getReportHistory(this.projectId, this.fileNameSearch, this.page);

    });
  }

  ngOnInit(): void {
    this.getProgressReport();
  }

  private getReportHistory(projectId: number, fileNameSearch: string, page: number) {
    this.progressReportService.findProgressReportByProjectIdAndStageId(projectId, fileNameSearch, page).subscribe(data => {
        // @ts-ignore
        this.progressReportPage = data.content;

        // @ts-ignore
        this.teamPage = data;

      },
      error => {
        this.flag = true;
        this.progressReportPage = [];
        this.teamPage = null;
      });
  }

  private getProgressReport() {
    this.progressReportService.findProgressReportMaxPercentByProjectIdAndStageId(this.projectId, this.stageId).subscribe(item => {
      this.projectName = item.project.projectName;
      this.stageName = item.stage.stageName;
    });
  }

  search(searchFileName: string) {
    this.fileNameSearch = searchFileName;
    console.log(this.fileNameSearch);
    this.currentPage = 0;

    this.getReportHistory(this.projectId, this.fileNameSearch, this.page);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getReportHistory(this.projectId, this.fileNameSearch, page);
  }
}
