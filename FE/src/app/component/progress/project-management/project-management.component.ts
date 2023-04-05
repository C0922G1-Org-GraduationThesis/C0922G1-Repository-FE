import {Component, OnInit} from '@angular/core';
import {ProgressService} from '../../../service/progress.service';
import {ProgressDto} from '../../../model/dto/progress-dto';
import {PageProgress} from '../../../model/page-progress';
import {ViewportScroller} from '@angular/common';


@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {

  constructor(private progressService: ProgressService,
              private viewportScroller: ViewportScroller) {
  }

  progressDtos: ProgressDto[] = [];

  teamPage!: PageProgress;
  nameProject = '';
  status: any;
  page = 0;

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.viewportScroller.scrollToPosition([0, 0]);
    if (this.status === undefined) {
      this.progressService.getAll2(this.page, this.nameProject).subscribe(result => {
        // @ts-ignore
        this.progressDtos = result.content;
        // @ts-ignore
        this.teamPage = result;
        console.log(result);
      });
    } else {
      this.progressService.getAll(this.page, this.nameProject, !this.status).subscribe(result => {
        // @ts-ignore
        this.progressDtos = result.content;
        // @ts-ignore
        this.teamPage = result;
        console.log(result);
      });
    }
  }

  changePage(page: number) {
    this.page = page;
    this.getAll();
  }

  search() {
    this.page = 0; // reset page number when searching
    this.getAll();
  }


}
