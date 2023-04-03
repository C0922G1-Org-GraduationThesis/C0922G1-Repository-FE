import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ProgressReport} from '../../../model/progress-report';
import {HttpClient} from '@angular/common/http';
import {ProgressReportService} from '../../../service/progress-report.service';


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

  constructor(private activatedRoute: ActivatedRoute,
              private progressReportService: ProgressReportService,
              private httpClient: HttpClient) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.projectId = +paramMap.get('projectId'),
        this.stageId = +paramMap.get('stageId'),
      this.getReportHistory(this.projectId, this.stageId);

    });
  }

  ngOnInit(): void {
    this.getProgressReport();
  }

  private getReportHistory(projectId: number, stageId: number) {
    this.progressReportService.findProgressReportByProjectIdAndStageId(projectId, stageId).subscribe(data => {
      this.progressReportHistory = data;
    });
  }

  private getProgressReport() {
    this.progressReportService.findProgressReportMaxPercentByProjectIdAndStageId(this.projectId, this.stageId).subscribe(item => {
      this.projectName = item.project.projectName;
      this.stageName = item.stage.stageName;
    });
  }

  // exportPdf(url: string) {
  //   const doc = new jsPDF();
  //   const width = doc.internal.pageSize.width;
  //   const height = doc.internal.pageSize.height;
  //   doc.addImage(url, 'JPEG', 0, 0, width, height);
  //   const fileName = 'my-document.pdf';
  //   doc.save(fileName);
  // }

  // dowFile(url: string) {
  //   download(url, 'my-document.pdf', 'application/pdf');
  // }
  // dowFile(url: string) {
  //   const firebaseLink = url; // Liên kết Firebase
  //
  //   this.httpClient.get(firebaseLink, {responseType: 'blob'}).subscribe(blob => {
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = 'file-name'; // Tên tệp được tải xuống
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //     window.URL.revokeObjectURL(url);
  //   });
  // }
}
