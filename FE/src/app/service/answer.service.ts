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
    console.log(questionId);
    return this.httpClient.get<Answers[]>(this.apiUrl + '?questionId=' + questionId);
  }

  create(answers: Answers) {
    return this.httpClient.post(this.apiUrl + '/save-answer', answers);
  }
}
