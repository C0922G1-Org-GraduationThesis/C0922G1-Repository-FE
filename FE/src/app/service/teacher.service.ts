import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Teacher} from '../model/teacher';
import {Faculty} from '../model/faculty';
import {Degree} from '../model/degree';
import {TeacherDto} from '../dto/teacher-dto';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private httpClient: HttpClient) {
  }

  findById(id: number): Observable<any> {
    return this.httpClient.get<Teacher>('http://localhost:8080/api/teachers/detailTeacher/' + id);
  }

  getAllFaculty(): Observable<any> {
    return this.httpClient.get<Faculty[]>('http://localhost:8080/api/teachers/facultyAll');
  }

  getAllDegree(): Observable<any> {
    return this.httpClient.get<Degree[]>('http://localhost:8080/api/teachers/degreeAll');
  }

  addTeacher(teacher: Teacher): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/teachers/createTeacher', teacher);
  }

  updateTeacher(teacher: Teacher): Observable<any> {
    return this.httpClient.patch('http://localhost:8080/api/teachers/updateTeacher/' + teacher.teacherId, teacher);
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
