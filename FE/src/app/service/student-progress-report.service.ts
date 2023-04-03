import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StudentProgressReport} from "../model/student-progress-report";
import {Page} from "../model/page";

@Injectable({
  providedIn: 'root'
})
export class StudentProgressReportService {
  private URL_API = 'http://localhost:8080/api/studentProgressReport';

  constructor(private httpClient: HttpClient) {
  }

  getStudentProgressReport(id: number): Observable<StudentProgressReport[]> {
    return this.httpClient.get<StudentProgressReport[]>(this.URL_API + '/' + id);
  }

  getAllStudentProgressReport(id: number, totalElement: number): Observable<StudentProgressReport[]> {
    return this.httpClient.get<StudentProgressReport[]>(this.URL_API + '/' + id + '/' + totalElement);
  }

}

