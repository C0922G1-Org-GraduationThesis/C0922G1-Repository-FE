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

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.getAllProject();
  }

  getAllProject() {
    this.projectService.getAllProject(this.currentPage, this.nameSearch).subscribe(item => {
      this.projectList = item.content;
      this.totalPages = item.totalPages;
    });
  }

  searchByName(value: string) {
    this.nameSearch = value;
    this.currentPage = 0;
    this.getAllProject();
  }

  nextSlide() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    this.getAllProject();
  }

  prevSlide() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
    this.getAllProject();
  }

  goBack() {
    this.nameSearch = '';
    this.currentPage = 0;
    this.getAllProject();
  }
}
