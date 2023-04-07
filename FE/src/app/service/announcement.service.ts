import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Announcement} from "../model/announcement";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  private API_URL = `http://localhost:8080/api/announcement/`;
  constructor(private httpClient: HttpClient) { }

  findAll(studentId: number): Observable<Announcement[]> {
    return this.httpClient.get<Announcement[]>(this.API_URL + studentId);
  }
}
