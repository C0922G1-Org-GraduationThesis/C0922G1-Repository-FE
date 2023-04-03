import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProgressReview} from '../model/progress-review';
import {ProjectDto} from '../model/dto/project-dto';

@Injectable({
  providedIn: 'root'
})
export class ProgressReviewService {

  constructor(private http: HttpClient) {
  }

  getProgressReviewByProjectId(projectId: number): Observable<ProgressReview[]> {
    return this.http.get<ProgressReview[]>('http://localhost:8080/api/progressReview/list/' + projectId);
  }

  getProgressReviewByRecord(projectId: number, record: number): Observable<ProgressReview[]> {
    return this.http.get<ProgressReview[]>('http://localhost:8080/api/progressReview/list/' + projectId + '/' + record);
  }

  getMaxSizeOfProgressReview(projectId: number): Observable<number> {
    return this.http.get<number>('http://localhost:8080/api/progressReview/size/' + projectId);
  }

  saveProgressReview(progressReviewDto, projectId: number): Observable<ProgressReview> {
    return this.http.post<ProgressReview>('http://localhost:8080/api/progressReview/save/' + projectId, progressReviewDto);
  }

  getProjectByProjectId(projectId: number): Observable<ProjectDto> {
    return this.http.get<ProjectDto>('http://localhost:8080/api/progressReview/project/' + projectId);
  }

  findMaxPercentProgressReport(projectId: number, stageId: number): Observable<number> {
    return this.http.get<number>('http://localhost:8080/api/progress-reviews' + '/' + projectId + '/' + stageId);
  }
}
