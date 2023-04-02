import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeacherDto} from '../dto/teacher-dto';

@Injectable({
  providedIn: 'root'
})
export class
TeacherService {

  constructor(private httpClient: HttpClient) {
  }
  // <!--create by :HungPV-->
  // <!--date create : 02/04/2023-->
  // <!--screen : get all teacher service -->
  getTeacher(name: string, page: number): Observable<Page<TeacherDto>> {
    return this.httpClient.get<Page<TeacherDto>>('http://localhost:8080/api/teachers/list?name=' + name + '&page=' + page);
  }
  // <!--create by :HungPV-->
  // <!--date create : 02/04/2023-->
  // <!--screen : delete teacher by id service-->
  deleteTeacherById(idDelete: number): Observable<TeacherDto> {
    return this.httpClient.delete('http://localhost:8080/api/teachers/delete/' + idDelete);
  }

}
// <!--create by :HungPV-->
// <!--date create : 02/04/2023-->
// <!--screen : interface paging-->
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
