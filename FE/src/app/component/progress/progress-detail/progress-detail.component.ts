import {Component, OnInit} from '@angular/core';

import Swal from 'sweetalert2';
import {ProgressDto} from "../../../dto/progress-dto";
import {ProgressStudentDto} from "../../../dto/progress-student-dto";
import {ProgressReview} from "../../../model/progress-review";
import {ProjectDto} from "../../../dto/project-dto";
import {TeacherDtoProgress} from "../../../dto/teacher-dto-progress";
import {ProgressDetail} from "../../../model/progress-detail";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {StudentProgressReport} from "../../../model/student-progress-report";
import {Question} from "../../../model/question";
import {Answers} from "../../../model/answers";
import {ProgressDetailService} from "../../../service/progress-detail.service";
import {ProgressReviewService} from "../../../service/progress-review.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {StudentProgressReportService} from "../../../service/student-progress-report.service";
import {QuestionService} from "../../../service/question.service";
import {AnswerService} from "../../../service/answer.service";
import {ViewportScroller} from "@angular/common";
import {TokenStorageService} from "../../../service/token-storage.service";
import {StudentService} from "../../../service/student/student.service";
import {Student} from "../../../model/student";
import {TeacherService} from "../../../service/teacher.service";
import {Teacher} from "../../../model/teacher";

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
  teacherDto?: TeacherDtoProgress;
  checkShowMore = true;
  checkHideMore = true;
  projectId: number;
  private maxSizeProgressReview: number;
  private record = 2;
  progressDetails: ProgressDetail[];
  progressReviewForm: FormGroup;
  // SyVT
  studentProgressReports: StudentProgressReport[];
  totalElementProgress = 2;
  maxElement = 0;
  flagProgress = true;
  // LanTTN
  questions: Question[] = [];
  answers: Answers[] = [];
  totalElementAnswer = 1;
  maxElementAnswer = 0;
  flagQuestion = true;
  question: Question;
  answer: Answers;
  temp: number;
  answerFlag = false;

  value = 50;
  role?: string;
  emailFindLeader?: string;
  flagLeader?: boolean;
  studentFindLeader?: Student;
  progressPercentage = 0;
  idTeam?: number;
  checkTeam?: boolean;
  checkTeacher?: boolean;
  teacherUser?: Teacher;

  constructor(private progressDetailService: ProgressDetailService,
              private progressReviewService: ProgressReviewService,
              private activatedRoute: ActivatedRoute,
              private studentProgressReportService: StudentProgressReportService,
              private questionService: QuestionService,
              private answerService: AnswerService,
              private viewportScroller: ViewportScroller,
              private tokenStorageService: TokenStorageService,
              private studentService: StudentService,
              private  teacherService: TeacherService) {
  }

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([-2, -2]);
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
      this.saveAutoProgressDetail(this.projectId);
      this.getAllQuestion();
      this.role = this.tokenStorageService.getUser().roles[0];
      this.emailFindLeader = this.tokenStorageService.getUser().username;
      this.findUser(this.emailFindLeader);
      this.idTeam = this.studentFindLeader.studentId;
      this.checkTeam = (this.idTeam === this.projectDto.team.teamId);
      this.checkTeacher = this.teacherDto.teacherId === this.teacherUser.teacherId;
    });
  }

  findUser(email: string) {
    if (this.role === 'ROLE_STUDENT') {
      this.studentService.findStudentByEmail(email).subscribe(next => {
        this.studentFindLeader = next;
        this.flagLeader = this.studentFindLeader.flagLeader;
      })
    } else {
      this.teacherService.findTeacherByEmail(email).subscribe(next => {
        this.teacherUser = next;
      })
    }
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
      this.progressPercentage = item[0].progressReviewPercent;
      if (this.maxSizeProgressReview === 0) {
        this.checkShowMore = false;
      }
    });
  }

  getProgressReviewWithRecord(projectId: number, record: number) {
    if (this.maxSizeProgressReview <= 2) {
      this.checkShowMore = false;
      this.checkHideMore = false;
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
      } else {
        this.checkShowMore = true;
        this.checkHideMore = true;
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
      if (item.length < this.record) {
        this.checkShowMore = false;
      }
    });
  }

  hideMore() {
    this.record -= 1;
    if (this.record < 2) {
      this.checkHideMore = false;
    } else {
      this.checkShowMore = true;
    }
    this.progressReviewService.getProgressReviewByRecord(this.projectId, this.record).subscribe(item => {
      this.progressReviewsRecords = item;
    });
  }

// SyVT
  private getLengthStudentProgressReport() {
    this.studentProgressReportService.getStudentProgressReport(this.projectId).subscribe(item => {
      this.maxElement = item.length;
      console.log(this.maxElement);
    });
  }

  private getAllStudentProgressReport() {
    this.studentProgressReportService.getAllStudentProgressReport(this.projectId, this.totalElementProgress).subscribe(
      (data) => {
        this.studentProgressReports = data;
        console.log(data.length);
      }
    );
  }

  hiddenLess() {
    if (this.totalElementProgress > 1) {
      this.totalElementProgress--;
      this.flagProgress = true;
    }
    this.studentProgressReportService.getAllStudentProgressReport(this.projectId, this.totalElementProgress).subscribe(
      (data) => {
        this.studentProgressReports = data;
        console.log(data.length);
        console.log(this.totalElementProgress);
      }
    );
  }

  loadMore() {
    if (this.totalElementProgress < this.maxElement) {
      this.totalElementProgress++;
    }
    if (this.totalElementProgress === this.maxElement) {
      this.flagProgress = false;
    }
    this.studentProgressReportService.getAllStudentProgressReport(this.projectId, this.totalElementProgress).subscribe(
      (data) => {
        this.studentProgressReports = data;
        console.log(data);
        console.log(data.length);
      }
    );
  }

  // VuLX
  saveAutoProgressDetail(projectId: number) {
    this.progressReviewService.saveAutoProgressDetailProgress(this.projectId).subscribe(() => {
    });
  }

  //////////////////////// LanNan
  getAllQuestion() {
    this.questionService.getAllQuestion(this.totalElementAnswer).subscribe(
      (data) => {
        this.questions = data.content;
        this.maxElementAnswer = data.totalPages;
        console.log(data.content);
      }
    );
  }

  hidden() {
    if (this.totalElementAnswer > 1) {
      this.totalElementAnswer--;
      this.flagQuestion = true;
    }
    this.questionService.getAllQuestion(this.totalElementAnswer).subscribe(
      (data) => {
        this.questions = data.content;
        console.log(data.content);
        console.log(this.totalElementAnswer);
      }
    );
  }

  loadMoreLan() {
    if (this.totalElementAnswer < this.maxElementAnswer) {
      this.totalElementAnswer++;
    }
    if (this.totalElementAnswer === this.maxElementAnswer) {
      this.flagQuestion = false;
    }
    this.questionService.getAllQuestion(this.totalElementAnswer).subscribe(
      (data) => {
        this.questions = data.content;
        console.log(data.content);
        // console.log(data.totalPages);
      }
    );
  }

  getAllAnswer(questionId: number) {
    this.answerFlag = true;
    this.temp = questionId;
    console.log('abc ' + questionId);
    this.answerService.getAllAnswer(questionId).subscribe(
      (data) => {
        this.answers = data;
        console.log(this.answers);
      }
    );
  }

  createQuestion() {
    this.question = this.formCreateQuestion.value;
    this.question.studentId = 2;
    this.question.questionTopic = 'Giai doan 3';
    this.questionService.create(this.question).subscribe(data => {
      this.totalElementAnswer++;
      this.getAllQuestion();
      this.formCreateQuestion.reset();
      this.answerFlag = false;
    });
  }

  createAnswer() {
    this.answer = this.formCreateAnswer.value;
    this.answer.teacherId = 1;
    this.answer.questionId = this.temp;
    console.log(this.answer.questionId);
    this.answerService.create(this.answer).subscribe(data => {
      this.getAllAnswer(this.temp);
      this.formCreateAnswer.reset();
    });
  }

  hideFormAnswer() {
    this.answerFlag = false;
  }

  updateProgress(event: Event) {
    const slider = event.target as HTMLInputElement;
    const value = Number(slider.value);
    const max = Number(slider.max);
    this.progressPercentage = Math.round((value / max) * 100);
  }

  ckeditorMinLengthValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const contentLength = control.value.replace(/<[^>]*>/g, '').length;
      return contentLength < minLength ? {'ckeditorMinLength': {value: control.value}} : null;
    };
  }

  formCreateQuestion: FormGroup = new FormGroup({
    questionContent: new FormControl('', [Validators.required, this.ckeditorMinLengthValidator(5)])
  });

  formCreateAnswer: FormGroup = new FormGroup({
    answerContent: new FormControl('', [Validators.required, this.ckeditorMinLengthValidator(5)])
  });

  keditorMaxLengthValidator(maxLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const contentLength = control.value.replace(/<[^>]*>/g, '').length;
      return contentLength > maxLength ? {'ckeditorMinLength': {value: control.value}} : null;
    };
  }

}
