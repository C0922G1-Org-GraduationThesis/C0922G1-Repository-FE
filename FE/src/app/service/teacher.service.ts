import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Teacher} from '../model/teacher';
import {HttpClient} from '@angular/common/http';
import {Admin} from '../model/admin';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) {
  }
  /**
   * Created by: Phạm Tiến
   * Date: 29/03/2023
   * Function: findTeacherByEmail(teacher,bindingResult )
   */
  findTeacherByEmail(email: string): Observable<Teacher> {
    return this.http.get<Teacher>(`http://localhost:8080/api/teachers/detail/${email}`);
  }
  /**
   * Created by: Phạm Tiến
   * Date: 29/03/2023
   * Function: findTeacherByEmail(teacher,bindingResult )
   */
  updateAdmin(admin: Admin): Observable<Teacher> {
    return this.http.patch<Admin>('http://localhost:8080/api/teachers/update-user-role-admin', admin);
  }
}
