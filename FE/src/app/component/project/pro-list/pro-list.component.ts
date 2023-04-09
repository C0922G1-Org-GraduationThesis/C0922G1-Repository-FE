import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../../service/project.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ProDto} from '../../../model/pro-dto';
import {ProjectJson} from '../../../model/project-json';
import {Project} from '../../../model/project';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-pro-list',
  templateUrl: './pro-list.component.html',
  styleUrls: ['./pro-list.component.css']
})
export class ProListComponent implements OnInit {
  projects: ProDto[] = [];
  teamPage!: ProjectJson;
  id: any;
  pro: Project = {};

  constructor(private  httpClient: HttpClient, private projectService: ProjectService, private router: Router) {
  }

  ngOnInit(): void {
    this.getPro(0);
  }

  getPro(page: number) {
    this.projectService.getPro(page).subscribe(data => {
      // console.log(data);
      // @ts-ignore
      this.projects = data.content;
      // @ts-ignore
      this.teamPage = data;
      console.log(this.projects);
    });
  }

  changePage(page: number) {
    this.getPro(page);
  }

  savePro(projectId: any) {
    this.projectService.updateBrowser(projectId).subscribe();
     window.location.reload();
  }

  saveProNext(projectId: number) {
    this.projectService.updateCancel(projectId).subscribe();
    window.location.reload();

  }

  exportPdf(url: string) {
    // @ts-ignore
    const doc = new jsPDF();
    const width = doc.internal.pageSize.width;
    const height = doc.internal.pageSize.height;
    console.log(width, height);
    doc.addImage(url, 'JPEG', 0, 0, width, height);
    const fileName = 'my-document.pdf';
    doc.save(fileName);
  }

  dowFile(url: any) {
    this.exportPdf(url);
  }
}
