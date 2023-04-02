import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeacherDto} from '../dto/teacher-dto';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private httpClient: HttpClient) {
  }

  getTeacher(name: string, page: number): Observable<Page<TeacherDto>> {
    return this.httpClient.get<Page<TeacherDto>>('http://localhost:8080/api/teachers/list?name=' + name + '&page=' + page);
  }

  deleteTeacherById(idDelete: number): Observable<TeacherDto> {
    return this.httpClient.delete('http://localhost:8080/api/teachers/delete/' + idDelete);
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
