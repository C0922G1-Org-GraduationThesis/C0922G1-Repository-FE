import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Clazz} from '../../model/clazz';

@Injectable({
  providedIn: 'root'
})
export class ClazzService {

  private API = 'http://localhost:8080/clazz';

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Clazz[]> {
    return this.httpClient.get<Clazz[]>(this.API);
  }
}
