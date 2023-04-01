import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../../service/project.service";
import {Router} from "@angular/router";
import {Project} from "../../../model/project";
import {ProJson} from "../../../model/pro-json";
import {ProDto} from "../../../model/pro-dto";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-pro-list',
  templateUrl: './pro-list.component.html',
  styleUrls: ['./pro-list.component.css']
})
export class ProListComponent implements OnInit {

    projects: ProDto[] = [];
  teamPage!: ProJson;
  id: any;
  pro: Project = {};
  buttonText: string = 'Duyệt ';
  projectId: any;

  approved(projectId: any) {
    this.id = projectId;
    console.log(this.id);
    if (this.id) {
      this.buttonText = 'Đã duyệt';
    }
  }


  constructor(private  httpClient:HttpClient,private projectService: ProjectService, private router: Router) {
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

  downloadTopic(url: string){
    return this.httpClient.get(url, {
      responseType: 'arraybuffer',
      headers: new HttpHeaders().append('Content-Type', 'application/pdf'),
    });
  }

  
}
