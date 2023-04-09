import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  API_URL = `http://localhost:8080/api/students/`;

  private API = 'http://localhost:8080/api/students';

  private URL_API_STUDENT = 'http://localhost:8080';

  constructor(private  httpClient: HttpClient) {
  }


  createStudent(student: Student): Observable<any> {
    return this.httpClient.post<any>(this.API + '/create', student);
  }

  // findById(studentId: number): Observable<Student[]> {
  //   return this.httpClient.get<Student[]>(this.API + '/' + studentId);
  // }


  updateStudent(studentId: number, student: Student): Observable<Student> {
    return this.httpClient.patch<Student>(this.API + '/update/' + studentId, student);
  }

  findAll(searchStr: string, page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(
      this.API_URL + '?searchStr=' + searchStr + '&page=' + page + '&size=' + size);
  }

  findById(id: number): Observable<Student> {
    return this.httpClient.get<Student>(this.API_URL + 'detail/' + id);
  }

  findStudentById(studentId: number): Observable<Student> {
    return this.httpClient.get<Student>("http://localhost:8080/api/students/getStd/" + studentId);
  }

  findByTeamId(page: number, size: number, teamId: number): Observable<any> {
    return this.httpClient.get<any>(
      this.API_URL + 'team/' + teamId + '/' + page + '/' + size);
  }

  findAllStudent(nameSearch: any, pageNumber: any): Observable<any> {

    return this.httpClient.get<any>(this.URL_API_STUDENT + '/api/students?nameSearch=' + nameSearch + '&page=' + pageNumber);
  }

  /**
   * create by VinhLD
   * date create 2/4/2023
   * Function: show the instructor's list of students
   *
   */

  getAllStudentByIdTeacher(id: any, pageNumber: any, nameSearch: any): Observable<any> {
    return this.httpClient.get<any>(this.URL_API_STUDENT + '/api/students/list-id-teacher/' + id + '?nameSearch='
      + nameSearch + '&page=' + pageNumber);
  }

  /**
   * Created by: Phạm Tiến
   * Date: 29/03/2023
   * Function: findTeacherByEmail(teacher,bindingResult )
   */
  findStudentByEmail(email: string): Observable<Student> {
    return this.httpClient.get<Student>(`http://localhost:8080/api/students/details/${email}`);
  }

  updateLeader(studentId: number, student: Student, teamId: number): Observable<Student> {
    return this.httpClient.put<Student>(this.API_URL + 'updateLeader/' + studentId + '/' + teamId, student);
  }
}
