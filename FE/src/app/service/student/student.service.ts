import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  API_URL = `http://localhost:8080/api/students/`;

  constructor(private http: HttpClient) {
  }

  findAll(searchStr: string, page: number, size: number): Observable<any> {
    return this.http.get<any>(
      this.API_URL + '?searchStr=' + searchStr + '&page=' + page + '&size=' + size);
  }

  findById(id: number): Observable<Student> {
    return this.http.get<Student>(this.API_URL + 'detail/' + id);
  }

  findByTeamId(page: number, size: number, teamId: number): Observable<any> {
    return this.http.get<any>(
      this.API_URL + 'team/' + teamId + '/' + page + '/' + size);
  }
}
