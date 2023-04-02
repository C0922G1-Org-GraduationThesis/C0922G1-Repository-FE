import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProgressReviewService {
  private URL_API = 'http://localhost:8080/api/progress-reviews';

  constructor(private httpClient: HttpClient) {
  }

  findMaxPercentProgressReport(projectId: number, stageId: number): Observable<number> {
    return this.httpClient.get<number>(this.URL_API + '/' + projectId + '/' + stageId);
  }

}
