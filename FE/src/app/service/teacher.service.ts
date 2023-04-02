import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Teacher} from '../model/teacher';
import {Faculty} from '../model/faculty';
import {Degree} from '../model/degree';

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
}
