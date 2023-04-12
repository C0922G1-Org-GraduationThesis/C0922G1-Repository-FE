import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Answers} from '../model/answers';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private apiUrl = 'http://localhost:8080/api/answers';

  constructor(private httpClient: HttpClient) {
  }

  getAllAnswer(questionId: number): Observable<Answers[]> {
    return this.httpClient.get<Answers[]>(this.apiUrl + '?questionId=' + questionId);
  }

  createAnswer(answers: Answers): Observable<void> {
    return this.httpClient.post<void>(this.apiUrl + '/save-answer', answers);
  }
}
