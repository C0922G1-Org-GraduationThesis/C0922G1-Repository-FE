import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProgressReportService} from "../../../service/progress-reprort.service";
import {ProgressReviewService} from "../../../service/progress-review.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from 'sweetalert2';


import {finalize} from "rxjs/operators";
import {AngularFireStorage} from '@angular/fire/storage';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-progress-report',
  templateUrl: './progress-report.component.html',
  styleUrls: ['./progress-report.component.css']
})
export class ProgressReportComponent implements OnInit {
  @ViewChild('uploadFile', {static: true}) public avatarDom: ElementRef | undefined;
  selectedFile: any = null;

  progressReportForm?: FormGroup;
  projectId: number;
  stageId: number;
  maxStagePercent: number;
  // maxStagePercent=50;

  projectName: string
  stageName: string;
  currentDate: Date = new Date();
  formattedDate: string;

  @Input() backgroundColor = '#D9D9D9';
  @Input() progressColor = 'rgba(219,17,47,0.82)';
  progress: number;
  value: number;
  fileUrl: string;


  constructor(private activatedRoute: ActivatedRoute,
              private progressReportService: ProgressReportService,
              private progressReviewService: ProgressReviewService,
              private storage: AngularFireStorage,
              private router: Router,
              private datePipe: DatePipe) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.projectId = +paramMap.get('1');
      this.stageId = +paramMap.get('1');
      this.getProgressReport(this.projectId, this.stageId);
    });
  }

  ngOnInit(): void {
    this.progressReviewService.findMaxPercentProgressReport(this.projectId, this.stageId).subscribe(maxStagePercent => {
      this.maxStagePercent = maxStagePercent;
      this.progress = this.maxStagePercent;
      this.value = this.progress;
      console.log(this.value)
    });
    this.progressReportService.findProgressReportMaxPercentByProjectIdAndStageId(this.projectId, this.stageId).subscribe(item => {
      this.projectName = item.project.projectName;
      this.stageName = item.stage.stageName;
    });


  }

  getProgressReport(projectId: number, stageId: number) {
    this.progressReportService.findProgressReportMaxPercentByProjectIdAndStageId(projectId, stageId).subscribe(item => {
      this.progressReportForm = new FormGroup({
        progressReportContent: new FormControl('', [Validators.required]),
        progressReportTime: new FormControl('', [Validators.required]),
        progressReportFile: new FormControl('', [Validators.required]),
        progressReportFileName: new FormControl('', [Validators.required]),
        project: new FormControl(item.project, [Validators.required]),
        stage: new FormControl(item.stage, [Validators.required])
      });
    });
  }

  save() {

    if (this.selectedFile != null) {
      const filePath = this.selectedFile.name;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.selectedFile);

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().toPromise().then(url => {
            this.fileUrl = url;
            console.log(this.fileUrl);
          });
        })
      ).subscribe();
    }
    this.progressReportForm.value.progressReportFile = this.fileUrl;
    this.formattedDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd HH:mm:ss');
    this.progressReportForm.value.progressReportTime = this.formattedDate;

    this.progressReportService.saveProgressReport(this.progressReportForm.value).subscribe(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      this.router.navigateByUrl("/progress")
    })
  }

  uploadFileImg() {
    this.selectedFile = this.avatarDom?.nativeElement.files[0];
    this.save();
  }

}
