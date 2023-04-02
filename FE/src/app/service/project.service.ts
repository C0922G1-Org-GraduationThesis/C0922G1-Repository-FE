import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) {
  }
  getAllProject(page: number, name: string): Observable<Page<Project>> {
    return this.httpClient.get<Page<Project>>('http://localhost:8080/api/projects?page=' + page + '&name=' + name);
  }

  getProjectDetail(id: number): Observable<Project> {
    return this.httpClient.get<Project>('http://localhost:8080/api/projects/detail/' + id);
  }

}

export interface Page<T> {
  content: T[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
