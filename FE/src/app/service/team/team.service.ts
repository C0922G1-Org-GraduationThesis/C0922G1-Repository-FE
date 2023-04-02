import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Team} from '../../model/team';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  API_URL = `http://localhost:8080/api/teams/`;

  constructor(private http: HttpClient) {
  }

  saveTeam(team: Team): Observable<any> {
    return this.http.post<Team>(this.API_URL + 'save/' + team.teamName + '/' + team.memberOfTeam, team);
  }
}
