import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../model/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) { }


  getPro(page: number): Observable<Project[]> {
    return this.httpClient.get<Project[]>('http://localhost:8080/api/projects/listPage'+'?page='+page);
  }


  updateBrowser(projectId: number) {
    // @ts-ignore
    return this.httpClient.put('http://localhost:8080/api/projects/browser/' + projectId);
  }

  updateCancel(projectId: number){
    // @ts-ignore
    return this.httpClient.put('http://localhost:8080/api/projects/cancel/' + projectId);
  }
}
