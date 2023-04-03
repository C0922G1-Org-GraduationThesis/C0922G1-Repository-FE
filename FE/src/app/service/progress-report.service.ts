import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProgressReport} from '../model/progress-report';

@Injectable({
  providedIn: 'root'
})
export class ProgressReportService {

  private URL_API = 'http://localhost:8080/api/progress-reports';

  constructor(private httpClient: HttpClient) {

  }

  getAllProgressReport(): Observable<ProgressReport[]> {
    return this.httpClient.get<ProgressReport[]>(this.URL_API);
  }

  findProgressReportById(id: number): Observable<ProgressReport> {
    return this.httpClient.get<ProgressReport>(this.URL_API + '/' + id);
  }

  findProgressReportByProjectIdAndStageId(projectId: number, stageId: number): Observable<ProgressReport[]> {
    return this.httpClient.get<ProgressReport[]>(this.URL_API + '/' + projectId + '/' + stageId);
  }

  findProgressReportMaxPercentByProjectIdAndStageId(projectId: number, stageId: number): Observable<ProgressReport> {
    return this.httpClient.get<ProgressReport>(this.URL_API + '/maxPercent/' + projectId + '/' + stageId);
  }

  saveProgressReport(progressReport: ProgressReport): Observable<ProgressReport> {
    return this.httpClient.post<ProgressReport>(this.URL_API, progressReport);
  }
}
