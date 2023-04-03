import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentService} from '../../../service/student.service';
import {Student} from '../../../model/student';
import {StudentInfo} from '../../../dto/student-info';
import {StudentInfoPage} from '../../../dto/student-info-page';

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


  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.getAllStudentAndSearch(this.id, this.page, this.nameSearch);
    this.searchStudent('', this.page);

  }

  /**
   * create by VinhLD
   * date create 2/4/2023
   * function:  show the instructor's list of students
   *
   */
  getAllStudentAndSearch(id, page, nameSearch) {
    this.studentService.getAllStudentByIdTeacher(id, page, nameSearch).subscribe(item => {
      this.studentInfoList = item.content;
      this.studentInfoPage = item;
    }, error => {

      this.studentInfoList = [];
    });
  }

  searchStudent(value: string, page: number) {
    this.getAllStudentAndSearch(this.id, page, value.trim());

  }

  changePage(page: number) {
    this.page = page;
    this.getAllStudentAndSearch(this.id, this.page, this.nameSearch);
  }
}
