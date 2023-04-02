import {Component, OnInit} from '@angular/core';
import {Student} from '../../../model/student';
import {StudentService} from '../../../service/student/student.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-info-team',
  templateUrl: './info-team.component.html',
  styleUrls: ['./info-team.component.css']
})
export class InfoTeamComponent implements OnInit {
  searchStr = '';
  totalPages: number;
  size = 100;
  currentPage = 0;
  listStudent: Student[] = [];
  teamPage: any;
  teamId = 2;

  constructor(private studentService: StudentService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.onSearch();
  }

  onSearch() {
    this.studentService.findByTeamId(this.currentPage, this.size, this.teamId).subscribe(data => {
      console.log(data);
      this.listStudent = data.content;
      this.totalPages = data.totalPages;
      this.teamPage = data;
    });
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.onSearch();
  }

  onSubmit() {
    this.route.navigateByUrl('students/register-topic');
  }
}
