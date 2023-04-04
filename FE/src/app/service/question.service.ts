import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Question} from '../model/question';
import {Page} from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:8080/api/questions';

  constructor(private httpClient: HttpClient) {
  }

  getAllQuestion(totalElement: number): Observable<Page<Question>> {
    return this.httpClient.get<Page<Question>>(this.apiUrl + '?totalElement=' + totalElement);
  }

  create(question: Question) {
    return this.httpClient.post(this.apiUrl + '/save-question', question);
  }
}
