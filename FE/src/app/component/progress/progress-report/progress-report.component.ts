import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {StudentProgressReport} from "../../../model/student-progress-report";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {ProgressReportService} from "../../../service/progress-reprort.service";
import {ProgressReviewService} from "../../../service/progress-review.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {ProgressReport} from "../../../model/progress-report";

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
  fileUrl = '';

  progressReportForm: FormGroup;
  projectId: number;
  stageId: number;
  maxStagePercent: number;
  // maxStagePercent=50;

  projectName: string
  stageName: String;
  currentDate: Date = new Date();
  formattedDate: string;

  @Input() backgroundColor = '#D9D9D9';
  @Input() progressColor = 'rgba(219,17,47,0.82)';
  progress : number;
  value : number;


  constructor(private activatedRoute: ActivatedRoute,
              private progressReportService: ProgressReportService,
              private progressReviewService: ProgressReviewService,
              private storage: AngularFireStorage,
              private router: Router,
              private datePipe : DatePipe) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.projectId = +paramMap.get('1');
      this.stageId = +paramMap.get('2');
      this.getProgressReport(this.projectId, this.stageId);
    });
  }

  ngOnInit(): void {
    this.uploadFileImg() ;
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
        project: new FormControl(item.project, [Validators.required]),
        stage: new FormControl(item.stage, [Validators.required])
      });
    });
  }

  save() {
     this.formattedDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd HH:mm:ss');
    console.log(this.formattedDate)
    this.progressReportForm.value.progressReportTime = this.formattedDate;
    this.progressReportService.saveProgressReport(this.progressReportForm.value).subscribe(() => {
      alert("Cập nhất tiến độ thành công !")
      this.router.navigateByUrl("/progress")
    })
  }

  submit() {
    if (this.selectedFile != null) {
      const filePath = this.selectedFile.name;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.selectedFile);

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().toPromise().then(url => {
            this.fileUrl = url;
            console.log(url);
          });
        })
      ).subscribe();
    }
  }


  uploadFileImg() {
    this.selectedFile = this.avatarDom?.nativeElement.files[0];
    // this.firebaseService.uploadFile(this.selectedImage).then(url => {
    //   this.arrayPicture.push(url);
    //   this.picture = this.arrayPicture.join(',');
    // });
    this.submit();
  }

}
