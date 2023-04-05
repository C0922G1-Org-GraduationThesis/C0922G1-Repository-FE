import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../service/project.service';
import {Project} from '../../../model/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projectList: Project[];
  totalPages: number;
  nameSearch = '';
  currentPage = 0;
  teamPage: any;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.getAllProject();
  }

  getAllProject() {
    this.projectService.getAllProject(this.currentPage, this.nameSearch).subscribe(item => {
      console.log(item)
      this.projectList = item.content;
      this.totalPages = item.totalPages;
      this.teamPage = item;
    });
  }

  searchByName(value: string) {
    this.nameSearch = value;
    this.currentPage = 0;
    this.getAllProject();
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getAllProject();
  }

  goBack() {
    this.nameSearch = '';
    this.currentPage = 0;
    this.getAllProject();
  }
}
