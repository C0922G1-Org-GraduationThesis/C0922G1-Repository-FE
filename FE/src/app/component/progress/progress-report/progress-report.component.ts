import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProgressReviewService} from '../../../service/progress-review.service';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import Swal from 'sweetalert2';


import {finalize} from 'rxjs/operators';
// @ts-ignore
import {AngularFireStorage} from '@angular/fire/storage';
import {DatePipe, ViewportScroller} from '@angular/common';
import {ProgressReportService} from '../../../service/progress-report.service';
import {Stage} from '../../../model/stage';
import {Project} from '../../../model/project';


@Component({
  selector: 'app-progress-report',
  templateUrl: './progress-report.component.html',
  styleUrls: ['./progress-report.component.css']
})
export class ProgressReportComponent implements OnInit {
  @ViewChild('uploadFile', {static: true}) public avatarDom: ElementRef | undefined;
  selectedFile: any = null;
  fileUrl: string;
  showMessage = true;

  progressReportForm?: FormGroup;
  projectId: number;
  stageId: number;
  maxStagePercent: number;
  stage: Stage;
  project: Project;


  projectName?: string;
  stageName?: string;
  currentDate: Date = new Date();
  formattedDate: string;

  @Input() backgroundColor = '#D9D9D9';
  @Input() progressColor = 'rgba(219,17,47,0.82)';
  progress: number;
  value: number;
  progressReportFileName: string;
  fileNameValue = true;
  progressReportContent: string;
  contentValue = true;

  constructor(private activatedRoute: ActivatedRoute,
              private progressReportService: ProgressReportService,
              private progressReviewService: ProgressReviewService,
              private storage: AngularFireStorage,
              private router: Router,
              private datePipe: DatePipe,
              private viewportScroller: ViewportScroller) {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.projectId = +paramMap.get('projectId');
      this.stageId = +paramMap.get('stageId');
      // this.getProgressReport();
    });
  }

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.progressReportService.findProjectByProjectId(this.projectId).subscribe(item2 => {
      this.project = item2;
      this.projectName = item2.projectName;
      if (this.stageId === 1) {
        this.stageName = 'Giai đoạn 1';
        this.stage.stageId = 1;
        this.stage.stageName = 'Giai đoạn 1';
      }
      if (this.stageId === 2) {

        this.stageName = 'Giai đoạn 2';
        this.stage.stageId = 2;
        this.stage.stageName = 'Giai đoạn 2';
      }
      if (this.stageId === 3) {
        this.stageName = 'Giai đoạn 3';
        this.stage.stageId = 3;
        this.stage.stageName = 'Giai đoạn 3';
      }
      if (this.stageId === 4) {
        this.stageName = 'Giai đoạn 4';
        this.stage.stageId = 4;
        this.stage.stageName = 'Giai đoạn 4';
      }
    });
    this.progressReviewService.findMaxPercentProgressReport(this.projectId, this.stageId).subscribe(maxStagePercent => {
      console.log(this.stageId);
      console.log(this.projectId);
      if (maxStagePercent === undefined) {
        this.maxStagePercent = 0;
        this.progress = 0;
        this.value = this.progress;
      } else {
        this.maxStagePercent = maxStagePercent;
        this.progress = this.maxStagePercent;
        this.value = this.progress;
        console.log(this.value);
      }
    });

    console.log(this.maxStagePercent);
    this.getProgressReport();
  }

  getProgressReport() {
    this.progressReportForm = new FormGroup({
      progressReportContent: new FormControl('', [Validators.required,this.keditorMinLengthValidator(10),this.keditorMaxLengthValidator(200)]),
      progressReportTime: new FormControl('', [Validators.required]),
      progressReportFile: new FormControl('', [Validators.required]),
      progressReportFileName: new FormControl('', [Validators.required,this.keditorMinLengthValidator(5),this.keditorMaxLengthValidator(100)])
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
            if (this.fileUrl != null) {
              this.showMessage = false;
            }
          });
        })
      ).subscribe();
    }
    this.progressReportForm.value.progressReportFile = this.fileUrl;
    this.formattedDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd HH:mm:ss');
    this.progressReportForm.value.progressReportTime = this.formattedDate;

    this.progressReportService.saveProgressReport(this.progressReportForm.value, this.projectId, this.stageId).subscribe(() => {
      Swal.fire({
        title: 'Thành Công',
        text: 'Cập nhật thành công !',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      this.router.navigateByUrl('/progress/progress-detail/' + this.projectId);
    });
  }

  uploadFileImg() {
    this.selectedFile = this.avatarDom?.nativeElement.files[0];
    this.save();

  }
  keditorMinLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const contentLength = control.value.replace(/<[^>]*>/g, '').length;
      return contentLength < minLength ? { 'ckeditorMinLength': { value: control.value } } : null;
    };
  }
  keditorMaxLengthValidator(maxLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const contentLength = control.value.replace(/<[^>]*>/g, '').length;
      return contentLength > maxLength ? { 'ckeditorMinLength': { value: control.value } } : null;
    };
  }
}
