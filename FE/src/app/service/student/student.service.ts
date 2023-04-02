import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  private API = 'http://localhost:8080/students';

  constructor(private  httpClient: HttpClient) {
  }


  createStudent(student: Student): Observable<any> {
    return this.httpClient.post<any>(this.API + '/create', student);
  }

  findById(studentId: number): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.API + '/' + studentId);
  }


  updateStudent(studentId: number, student: Student): Observable<Student> {
    return this.httpClient.patch<Student>(this.API + '/update/' + studentId, student);
  }
}
