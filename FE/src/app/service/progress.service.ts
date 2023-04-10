import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProgressDto} from "../dto/progress-dto";

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor(private http: HttpClient) {
  }

  private URI_API = 'http://localhost:8080/api/progress/list';

  getAll(page: number, nameProject: string, status: boolean): Observable<ProgressDto[]> {
    return this.http.get<ProgressDto[]>(`${this.URI_API}?page=${page}&nameProject=${nameProject}&status=${status}`);
  }

  getAll2(page: number, nameProject: string): Observable<ProgressDto[]> {
    return this.http.get<ProgressDto[]>(`${this.URI_API}?page=${page}&nameProject=${nameProject}`);
  }

}
