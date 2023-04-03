import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  API_URL = `http://localhost:8080/api/projects/`;

  constructor(private http: HttpClient) {
  }

  findAll(searchName: string, page: number, size: number): Observable<any> {
    return this.http.get<any>(this.API_URL + '?searchName=' + searchName + '&size=' + size + '&page=' + page);
  }
}
