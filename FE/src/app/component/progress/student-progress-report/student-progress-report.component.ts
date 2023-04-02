import {Component, OnInit} from '@angular/core';
import {StudentProgressReportService} from "../../../service/student-progress-report.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StudentProgressReport} from "../../../model/student-progress-report";
import {AngularFireStorage} from "@angular/fire/storage";
import {jsPDF} from "jspdf";

@Component({
  selector: 'app-student-progress-report',
  templateUrl: './student-progress-report.component.html',
  styleUrls: ['./student-progress-report.component.css']
})
export class StudentProgressReportComponent implements OnInit {
  projectId: number;

  studentProgressReportHistory: StudentProgressReport[];

  constructor(private studentProgressReportService: StudentProgressReportService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private afStorage: AngularFireStorage) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.projectId = +paramMap.get('1')
    });
  }

  ngOnInit(): void {
    this.getAllStudentProgressReport();
  }


  private getAllStudentProgressReport() {
    this.studentProgressReportService.getStudentProgressReport(this.projectId).subscribe(studentProgressReports => {
      this.studentProgressReportHistory = studentProgressReports;
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
