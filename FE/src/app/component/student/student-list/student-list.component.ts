import {Component, OnInit} from '@angular/core';
import {StudentDto} from '../../../dto/student-dto';
import {StudentPage} from '../../../dto/student-page';
import {StudentService} from '../../../service/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  nameSearch = '';
  studentDtos: StudentDto[] = [];
  studentPage!: StudentPage;

  page = 0;


  constructor(private studentService: StudentService) {

  }

  ngOnInit(): void {
    this.searchStudent('', this.page);
  }

  /**
   * create by VinhLD
   * date create 2/4/2023
   * function: show list student
   *
   */
  // tslint:disable-next-line:typedef
  searchStudent(nameSearch: string, page: number) {
    this.studentService.findAllStudent(nameSearch.trim(), page).subscribe(data => {
      console.log(data);

      this.studentDtos = data.content;
      this.studentPage = data;
    }, error => {
      console.log(error);
      this.studentDtos = [];
    });

  }

  // tslint:disable-next-line:typedef
  changePage(page: number) {
    this.page = page;

    this.searchStudent(this.nameSearch, page);
  }


}

