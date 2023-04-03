import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProgressDto} from '../model/dto/progress-dto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  constructor(private http: HttpClient) {
  }

  private URI_API = 'http://localhost:8080/api/progress/list';
  getAll(): Observable<ProgressDto[]> {
    return this.http.get<ProgressDto[]>(this.URI_API);
  }
}
