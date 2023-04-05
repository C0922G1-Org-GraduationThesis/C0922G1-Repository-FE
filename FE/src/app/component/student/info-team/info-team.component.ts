import {Component, OnInit} from '@angular/core';
import {Student} from '../../../model/student';
import {StudentService} from '../../../service/student/student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Team} from '../../../model/team';
import {TeamService} from '../../../service/team.service';
import {ProjectService} from "../../../service/project.service";
import {Project} from "../../../model/project";

@Component({
  selector: 'app-info-team',
  templateUrl: './info-team.component.html',
  styleUrls: ['./info-team.component.css']
})
export class InfoTeamComponent implements OnInit {
  totalPages: number;
  size = 4;
  currentPage = 0;
  listStudent: Student[] = [];
  teamPage: any;
  teamId: number;
  team: Team;
  searchStr = '';
  project: Project = null;

  constructor(private studentService: StudentService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private teamService: TeamService,
              private projectService: ProjectService) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.teamId = +paramMap.get('teamId');
      this.teamService.findById(this.teamId).subscribe(team => {
        this.team = team;
        this.teamPage = team;
      });
      this.projectService.getProjectDetail(this.teamId).subscribe(projet =>{
        this.project = projet;
      })
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
    this.route.navigateByUrl('students/register-topic/' + this.teamId);
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.onSearch();
  }
}
