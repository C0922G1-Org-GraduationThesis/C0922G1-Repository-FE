import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Student} from '../../../model/student';
import {StudentInfo} from '../../../dto/student-info';
import {StudentService} from "../../../service/student/student.service";
import {StudentInfoPage} from "../../../dto/student-info-page.ts";
import {Teacher} from "../../../model/teacher";
import {TokenStorageService} from "../../../service/token-storage.service";
import {TeacherService} from "../../../service/teacher.service";

@Component({
  selector: 'app-student-instructor',
  templateUrl: './student-instructor.component.html',
  styleUrls: ['./student-instructor.component.css']
})
export class StudentInstructorComponent implements OnInit {
  studentInfoList: StudentInfo[] = [];
  studentInfoPage!: StudentInfoPage;
  teacher?:Teacher;
  email?:string;

  private id ?: number;
  page = 0;
  nameSearch = '';


  constructor(private studentService: StudentService,
              private tokenStorageService:TokenStorageService,
              private teacherService: TeacherService
  ) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()){
      this.email=this.tokenStorageService.getUser().username;
      console.log(this.email)
    }
    this.findTeacherByEmail(this.email);
  }
  findTeacherByEmail(email:string){
    this.teacherService.findTeacherByEmail(email).subscribe(next=>{
      this.teacher=next;
      console.log('next: '+next)
      this.id=this.teacher.teacherId;
      this.getAllStudentAndSearch();
      this.searchStudent();
    })
  }

  /**
   * create by VinhLD
   * date create 2/4/2023
   * function:  show the instructor's list of students
   *
   */
  getAllStudentAndSearch() {

    this.studentService.getAllStudentByIdTeacher(this.id, this.page, this.nameSearch.trim()).subscribe(item => {
      this.studentInfoList = item.content;
      this.studentInfoPage = item;
    }, error => {

      this.studentInfoList = [];
    });
  }

  searchStudent() {
    this.getAllStudentAndSearch();

  }

  changePage(page: number) {
    this.page = page;
    this.getAllStudentAndSearch();
    this.page = 0;
  }

}
