import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  API_URL = `http://localhost:8080/api/projects/`;


  constructor(private httpClient: HttpClient) {
  }
  /**
   * Created by: hoangNNH
   * Date create: 29/03/2023
   */
  getAllProject(page: number, name: string): Observable<Page<Project>> {
    return this.httpClient.get<Page<Project>>('http://localhost:8080/api/projects?page=' + page + '&name=' + name);
  }
  /**
   * Created by: hoangNNH
   * Date create: 29/03/2023
   */
  getProjectDetail(id: number): Observable<Project> {
    return this.httpClient.get<Project>('http://localhost:8080/api/projects/detail/' + id);
  }

  findAll(searchName: string, page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '?searchName=' + searchName + '&size=' + size + '&page=' + page);
  }

  /**
   * Created by: NuongHT
   * Date create: 29/03/2023
   */
  getPro(page: number): Observable<Project[]> {
    return this.httpClient.get<Project[]>('http://localhost:8080/api/projects/listPage' + '?page=' + page);
  }

  /**
   * Created by: NuongHT
   * Date create: 29/03/2023
   */
  updateBrowser(projectId: number) {
    // @ts-ignore
    return this.httpClient.put('http://localhost:8080/api/projects/browser/' + projectId);
  }
  /**
   * Created by: NuongHT
   * Date create: 29/03/2023
   */
  updateCancel(projectId: number) {
    // @ts-ignore
    return this.httpClient.put('http://localhost:8080/api/projects/cancel/' + projectId);
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
