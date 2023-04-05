import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Teacher} from '../model/teacher';
import {Student} from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
  }
  /**
   * Created by: Phạm Tiến
   * Date: 29/03/2023
   * Function: findTeacherByEmail(teacher,bindingResult )
   */
  findStudentByEmail(email: string): Observable<Student> {
    return this.http.get<Student>(`http://localhost:8080/api/public/students/detail/${email}`);
  }
}
