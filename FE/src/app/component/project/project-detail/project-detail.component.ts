import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../service/project.service';
import {Project} from '../../../model/project';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;

  id: number;

  constructor(private projectService: ProjectService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.id = +param.get('id');
      this.projectService.getProjectDetail(this.id).subscribe(item => {
        this.project = item;
      });
    });
  }

}
