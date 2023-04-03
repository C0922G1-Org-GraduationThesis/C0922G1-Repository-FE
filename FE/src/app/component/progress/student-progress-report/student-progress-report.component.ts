import {Component, OnInit} from '@angular/core';
import {StudentProgressReportService} from "../../../service/student-progress-report.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentProgressReport} from "../../../model/student-progress-report";
import {AngularFireStorage} from "@angular/fire/storage";
import {jsPDF} from "jspdf";
import {Page} from "../../../model/page";

@Component({
  selector: 'app-student-progress-report',
  templateUrl: './student-progress-report.component.html',
  styleUrls: ['./student-progress-report.component.css']
})
export class StudentProgressReportComponent implements OnInit {
  projectId: number;

  studentProgressReports: StudentProgressReport[];
  totalElement = 3;
  maxElement = 0;
  flag = true;

  constructor(private studentProgressReportService: StudentProgressReportService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.projectId = +paramMap.get('projectId')
    });
  }

  ngOnInit(): void {
    this.getAllStudentProgressReport();
    this.getLengthStudentProgressReport();
  }

  // exportPdf(url: string) {
  //   const doc = new jsPDF();
  //   const width = doc.internal.pageSize.width;
  //   const height = doc.internal.pageSize.height;
  //   doc.addImage(url, 'JPEG', 0, 0, width, height);
  //   const fileName = 'my-document.pdf';
  //   doc.save(fileName);
  // }
  //
  // dowFile(url: string) {
  //   this.exportPdf(url);
  // }
  private getLengthStudentProgressReport() {
this.studentProgressReportService.getStudentProgressReport(this.projectId).subscribe(item =>{
  this.maxElement = item.length;
  console.log(this.maxElement);
})
  }

  private getAllStudentProgressReport() {
      this.studentProgressReportService.getAllStudentProgressReport(this.projectId,this.totalElement).subscribe(
        (data) => {
          this.studentProgressReports = data;
          console.log(data.length);
        }
      );
  }

  hiddenLess() {
    if (this.totalElement > 1) {
      this.totalElement--;
      this.flag = true;
    }
    this.studentProgressReportService.getAllStudentProgressReport(this.projectId,this.totalElement).subscribe(
      (data) => {
        this.studentProgressReports = data;
        console.log(data.length);
        console.log(this.totalElement);
      }
    );
  }

  loadMore() {
    if (this.totalElement < this.maxElement) {
      this.totalElement++;
    }
    if (this.totalElement === this.maxElement) {
      this.flag = false;
    }
    this.studentProgressReportService.getAllStudentProgressReport(this.projectId,this.totalElement).subscribe(
      (data) => {
        this.studentProgressReports = data;
        console.log(data);
        console.log(data.length);
      }
    );
  }


}
