import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Student} from '../../../model/student';
import {StudentInfo} from '../../../dto/student-info';
import {StudentService} from "../../../service/student/student.service";
import {StudentInfoPage} from "../../../dto/student-info-page.ts";

@Component({
  selector: 'app-student-instructor',
  templateUrl: './student-instructor.component.html',
  styleUrls: ['./student-instructor.component.css']
})
export class StudentInstructorComponent implements OnInit {
  studentInfoList: StudentInfo[] = [];
  studentInfoPage!: StudentInfoPage;

  private id = 1;
  page = 0;
  nameSearch = '';


  constructor(private studentService: StudentService,
  ) {
  }

  ngOnInit(): void {
    this.getAllStudentAndSearch();
    this.searchStudent();

  }

  /**
   * create by VinhLD
   * date create 2/4/2023
   * function:  show the instructor's list of students
   *
   */
  getAllStudentAndSearch() {

    this.studentService.getAllStudentByIdTeacher(this.id, this.page, this.nameSearch).subscribe(item => {
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
