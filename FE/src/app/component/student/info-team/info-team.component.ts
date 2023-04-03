import {Component, OnInit} from '@angular/core';
import {Student} from '../../../model/student';
import {StudentService} from '../../../service/student/student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Team} from '../../../model/team';
import {TeamService} from '../../../service/team/team.service';

@Component({
  selector: 'app-info-team',
  templateUrl: './info-team.component.html',
  styleUrls: ['./info-team.component.css']
})
export class InfoTeamComponent implements OnInit {
  totalPages: number;
  size = 100;
  currentPage = 0;
  listStudent: Student[] = [];
  teamPage: any;
  teamId: number;
  team: Team;

  constructor(private studentService: StudentService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private teamService: TeamService) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.teamId = +paramMap.get('teamId');
      this.teamService.findById(this.teamId).subscribe(team => {
        this.team = team;
      });
    });
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

  onSubmit() {
    this.route.navigateByUrl('students/register-topic');
  }
}
