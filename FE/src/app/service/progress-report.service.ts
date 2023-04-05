import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProgressReport} from '../model/progress-report';
import {ProgressDetail} from '../model/progress-detail';
import {Project} from '../model/project';

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

  findProgressReportByProjectIdAndStageId(projectId: number, fileNameSearch: string, page: number): Observable<ProgressReport[]> {
    return this.httpClient.get<ProgressReport[]>(this.URL_API + '/history/' + projectId + '?nameFileSearch=' + fileNameSearch + '&page=' + page);
  }

  findProgressReportMaxPercentByProjectIdAndStageId(projectId: number, stageId: number): Observable<ProgressReport> {
    return this.httpClient.get<ProgressReport>(this.URL_API + '/maxPercent/' + projectId + '/' + stageId);
  }

  saveProgressReport(progressReport: ProgressReport, projectId: number, stageId: number): Observable<ProgressReport> {
    return this.httpClient.post<ProgressReport>(this.URL_API + '/save/' + projectId + '/' + stageId, progressReport);
  }

  findProgressDetailByProjectIdAndStageId(projectId: number, stageId: number): Observable<ProgressDetail> {
    return this.httpClient.get<ProgressDetail>(this.URL_API + '/' + projectId + '/' + stageId);
  }

  findProjectByProjectId(projectId: number): Observable<Project> {
    return this.httpClient.get<Project>(this.URL_API + '/project' + '/' + projectId);
  }
}
