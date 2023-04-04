import {Component, OnInit} from '@angular/core';
import {ProgressService} from '../../../service/progress.service';
import {ProgressDto} from '../../../model/dto/progress-dto';
import {PageProgress} from '../../../model/page-progress';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {

  constructor(private progressService: ProgressService) {
  }

  progressDtos: ProgressDto[] = [];

  teamPage!: PageProgress;

  ngOnInit(): void {
    this.getAll(0);
  }

  getAll(page) {
    this.progressService.getAll(page).subscribe(result => {
      // @ts-ignore
      this.progressDtos = result.content;
      // @ts-ignore
      this.teamPage = result;
      console.log(result);
    });
  }

  changePage(page: number) {
    // @ts-ignore
    this.getAll(page);
  }

}
