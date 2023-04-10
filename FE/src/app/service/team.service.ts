import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeacherDto} from '../model/teacher-dto';
import {Team} from '../model/team';
import {Teacher} from '../model/teacher';
import {ITeacherDto} from '../model/iteacher-dto';
import {ITeamDto} from '../model/iteam-dto';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private URL = 'http://localhost:8080/api/teams';
  API_URL = `http://localhost:8080/api/teams/`;

  constructor(private http: HttpClient) {
  }

  getTeacherById(id: number): Observable<ITeacherDto> {
    return this.http.get<ITeacherDto>(`${this.URL}/teacher/${id}`);
  }

  getAllInstructor(page: number): Observable<TeacherDto[]> {
    return this.http.get<TeacherDto[]>(`${this.URL}?page=${page}`);
  }

  editInstructor(id: number, team: ITeamDto): Observable<Team> {
    return this.http.patch<Team>(`${this.URL}/edit/${id}`, team);
  }

  getTeamById(id: number): Observable<ITeamDto> {
    return this.http.get<ITeamDto>(`${this.URL}/detail/team/${id}`);
  }

  getTeamByEmail(email: string) :Observable<ITeamDto>{
    return this.http.get<ITeamDto>(`${this.URL}/detail/team/${email}`);
  }

  saveTeam(team: Team): Observable<any> {
    return this.http.post<Team>(this.API_URL + 'save/' + team.teamName + '/' + team.memberOfTeam, team);
  }

  findById(id: number): Observable<Team> {
    return this.http.get<Team>(this.API_URL + 'detail/' + id);
  }
}
