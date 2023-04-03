import {Component, OnInit} from '@angular/core';
import {ProgressDetailService} from '../../../service/progress-detail.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ProgressDto} from '../../../model/dto/progress-dto';
import {ProgressStudentDto} from '../../../model/dto/progress-student-dto';
import {ProgressReviewService} from '../../../service/progress-review.service';
import {ProgressReview} from '../../../model/progress-review';
import {ProgressDetail} from '../../../model/progress-detail';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectDto} from '../../../model/dto/project-dto';
import {TeacherDto} from '../../../model/dto/teacher-dto';
import Swal from 'sweetalert2';
import {templateJitUrl} from '@angular/compiler';
import {StudentProgressReport} from '../../../model/student-progress-report';
import {StudentProgressReportService} from '../../../service/student-progress-report.service';

@Component({
  selector: 'app-progress-detail',
  templateUrl: './progress-detail.component.html',
  styleUrls: ['./progress-detail.component.css']
})
export class ProgressDetailComponent implements OnInit {
  progressDto: ProgressDto;
  progressStudentDtos: ProgressStudentDto[];
  progressReviews: ProgressReview[];
  progressReviewsRecords: ProgressReview[];
  projectDto: ProjectDto;
  teacherDto?: TeacherDto;
  checkShowMore = true;
  checkHideMore = true;
   projectId: number;
  private maxSizeProgressReview: number;
  private record = 2;
  progressDetails: ProgressDetail[];
  progressReviewForm: FormGroup;
  // SyVT
  studentProgressReports: StudentProgressReport[];
  totalElement = 3;
  maxElement = 0;
  flagSyVT = true;

  constructor(private progressDetailService: ProgressDetailService,
              private progressReviewService: ProgressReviewService,
              private activatedRoute: ActivatedRoute,
              private studentProgressReportService: StudentProgressReportService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.projectId = +paramMap.get('id');
      this.getProjectById(this.projectId);
      this.getStudentOfTeam(this.projectId);
      this.getProgressReview(this.projectId);
      this.getProgressDetailByProjectId(this.projectId);
      this.getProjectByProjectId(this.projectId);
      this.addNewProgressReview();
      this.getMaxSizeOfProgressReview(this.projectId);
      this.getProgressReviewWithRecord(this.projectId, 2);
      this.getAllStudentProgressReport();
      this.getLengthStudentProgressReport();
    });
  }

  getProjectById(projectId: number) {
    this.progressDetailService.findProgressProjectById(projectId).subscribe(item => {
      this.progressDto = item;
    });
  }

  getStudentOfTeam(projectId: number) {
    this.progressDetailService.findStudentOfTeam(projectId).subscribe(item => {
      this.progressStudentDtos = item;
    });
  }

  getProgressReview(projectId: number) {
    this.progressReviewService.getProgressReviewByProjectId(projectId).subscribe(item => {
      this.progressReviews = item;
      if (this.maxSizeProgressReview === 0) {
        this.checkShowMore = false;
      }
    });
  }

  getProgressReviewWithRecord(projectId: number, record: number) {
    if (this.maxSizeProgressReview <= 2) {
      this.checkShowMore = false;
      this.checkHideMore = false;
      console.log(this.maxSizeProgressReview);
      console.log(this.checkShowMore);
      console.log(this.checkHideMore);
    }
    this.progressReviewService.getProgressReviewByRecord(projectId, record).subscribe(progressReviews => {
      this.progressReviewsRecords = progressReviews;
      this.teacherDto = progressReviews[0].teacher;
    });
  }

  getProgressDetailByProjectId(projectId: number) {
    this.progressDetailService.findAllProgressDetailByProjectId(projectId).subscribe(items => {
      this.progressDetails = items;
    });
  }

  getProjectByProjectId(projectId: number) {
    this.progressReviewService.getProjectByProjectId(projectId).subscribe(item => {
      this.projectDto = item;
    });
  }

  addNewProgressReview() {
    this.progressReviewForm = new FormGroup({
      progressReviewId: new FormControl(),
      progressReviewTitle: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      progressReviewContent: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      progressReviewPercent: new FormControl('', Validators.required)
    });
  }


  onSubmit() {
    this.progressReviewService.saveProgressReview(this.progressReviewForm.value, this.projectId).subscribe(() => {
      this.ngOnInit();
      Swal.fire({
        title: 'Thông báo đánh giá',
        text: 'Bạn đã đánh giá thành công',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }, error => {

      Swal.fire({
        title: 'Thông báo đánh giá',
        text: 'Đã có lỗi xảy ra trong lúc bạn nhập đánh giá, vui lòng kiểm tra lại',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }

  getMaxSizeOfProgressReview(projectId) {
    this.progressReviewService.getMaxSizeOfProgressReview(projectId).subscribe(item => {
      this.maxSizeProgressReview = +item;
      if (this.maxSizeProgressReview <= 2) {
        this.checkShowMore = false;
        this.checkHideMore = false;
      }
    });
  }

  showMore() {
    this.record += 1;
    if (this.record >= 2) {
      this.checkHideMore = true;
    }
    this.progressReviewService.getProgressReviewByRecord(this.projectId, this.record).subscribe(item => {
      this.progressReviewsRecords = item;
    });
  }

  hideMore() {
    this.record -= 1;
    if (this.record < 2) {
      this.checkHideMore = false;
    }
    this.progressReviewService.getProgressReviewByRecord(this.projectId, this.record).subscribe(item => {
      this.progressReviewsRecords = item;
    });
  }
// SyVT
  private getLengthStudentProgressReport() {
    this.studentProgressReportService.getStudentProgressReport(this.projectId).subscribe(item =>{
      this.maxElement = item.length;
      console.log(this.maxElement);
    });
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
      this.flagSyVT = true;
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
      this.flagSyVT = false;
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
