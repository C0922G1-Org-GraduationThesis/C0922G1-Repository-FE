import {Component, OnInit} from '@angular/core';
import {StudentDto} from '../../../dto/student-dto';
import {StudentPage} from '../../../dto/student-page';
import {StudentService} from '../../../service/student/student.service';
import {Student} from "../../../model/student";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  nameSearch = '';
  studentDtos: StudentDto[] = [];
  studentPage!: StudentPage;
  student: Student
  page = 0;


  constructor(private studentService: StudentService,) {
    this.searchStudent();
  }

  ngOnInit(): void {
  }

  /**
   * create by VinhLD
   * date create 2/4/2023
   * function: show list student
   *
   */
  searchStudent() {
    this.studentService.findAllStudent(this.nameSearch.trim(), this.page).subscribe(data => {
      console.log(this.nameSearch);
      console.log(data);

      this.studentDtos = data.content;
      this.studentPage = data;
    }, error => {
      console.log(error);
      this.studentDtos = [];
    });

  }

  changePage(page: number) {
    this.page = page;
    this.searchStudent();
    this.page =0;
  }


  getStudentById(studentId: any) {
    this.studentService.findById(studentId).subscribe(item => {
      this.student = item;
    });

  }
}
