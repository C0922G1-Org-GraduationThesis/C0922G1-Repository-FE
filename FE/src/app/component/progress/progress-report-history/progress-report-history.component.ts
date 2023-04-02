import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProgressReportService} from "../../../service/progress-reprort.service";
import {ProgressReport} from "../../../model/progress-report";
import {jsPDF} from 'jspdf';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-progress-report-history',
  templateUrl: './progress-report-history.component.html',
  styleUrls: ['./progress-report-history.component.css']
})
export class ProgressReportHistoryComponent implements OnInit {
  projectId: number;
  stageId: number;
  progressReportHistory: ProgressReport[];
  private projectName: string;
  private stageName: string;

  constructor(private activatedRoute: ActivatedRoute,
              private progressReportService: ProgressReportService) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.projectId = +paramMap.get('projectId'),
        this.stageId = +paramMap.get('stageId')
      this.getReportHistory(this.projectId, this.stageId);

    })
  }

  ngOnInit(): void {
    this.getProgressReport();
  }

  private getReportHistory(projectId: number, stageId: number) {
    this.progressReportService.findProgressReportByProjectIdAndStageId(projectId, stageId).subscribe(progressReports => {
      this.progressReportHistory = progressReports;
    })
  }

  private getProgressReport() {
    this.progressReportService.findProgressReportMaxPercentByProjectIdAndStageId(this.projectId, this.stageId).subscribe(item =>{
      this.projectName = item.project.projectName;
      this.stageName = item.stage.stageName;
    })
  }
  exportPdf(url: string) {
    const doc = new jsPDF();
    const width = doc.internal.pageSize.width;
    const height = doc.internal.pageSize.height;
    doc.addImage(url, 'JPEG', 0, 0, width, height);
    const fileName = 'my-document.pdf';
    doc.save(fileName);
  }

  dowFile(url: string) {
    this.exportPdf(url);
  }
}
