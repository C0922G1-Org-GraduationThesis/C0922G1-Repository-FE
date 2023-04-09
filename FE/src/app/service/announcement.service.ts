import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Announcement} from "../model/announcement";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private API_URL = `http://localhost:8080/api/announcements/`;
  constructor(private httpClient: HttpClient) { }

  findAll(studentId: number): Observable<Announcement[]> {
    return this.httpClient.get<Announcement[]>(this.API_URL + studentId);
  }

  notJoin(project: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/api/students/deny-join-group', project)
  }

  joinTeam(studentId: number, teamId: number, project: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/api/students/accept-join-group/' + studentId +'/' + teamId, project);
  }
}
