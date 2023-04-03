import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private URL_API_STUDENT = 'http://localhost:8080';


  constructor(private httpClient: HttpClient) {
  }


  /**
   * create by VinhLD
   * date create 2/4/2023
   * function: show list student
   *
   */
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

}
