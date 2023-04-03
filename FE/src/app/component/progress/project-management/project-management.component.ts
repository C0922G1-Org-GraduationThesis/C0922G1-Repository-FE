import {Component, OnInit} from '@angular/core';
import {ProgressService} from '../../../service/progress.service';
import {ProgressDto} from '../../../model/dto/progress-dto';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {

  constructor(private progressService: ProgressService) {
  }

  progressDtos: ProgressDto[] = [];

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.progressService.getAll().subscribe(result => {
        this.progressDtos = result;
      });
  }
}
