import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../../service/token-storage.service";
import {ShareService} from "../../../service/share.service";
import {TeacherService} from "../../../service/teacher.service";
import {StudentService} from "../../../service/student/student.service";
import {ProgressService} from "../../../service/progress.service";
import {ProgressReportService} from "../../../service/progress-report.service";
import {Team} from "../../../model/team";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username?: string;
  img?: string;
  name?: string;
  role?: string;
  isLoggedIn = false;
  idProject?: number;
  idStage?: number;
  flagStudentLeader = false;
  studentId: number;
  teamId?: Team;

  constructor(private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private teacherService: TeacherService,
              private studentService: StudentService,
              private progressReportService: ProgressReportService) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.role = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
    }
    this.isLoggedIn = this.username != null;
    this.findNameUser();
  }

  ngOnInit(): void {
    this.loadHeader();
    this.findProjectIdAndStageId(this.username);
  }

  findNameUser(): void {
    if (this.role === 'ROLE_ADMIN' || this.role === 'ROLE_TEACHER') {
      this.teacherService.findTeacherByEmail(this.username).subscribe(next => {
        this.name = next.teacherName;
        this.img = next.teacherImg;
      });
    } else {
      this.studentService.findStudentByEmail(this.username).subscribe(next => {
        console.log(next)
        this.name = next.studentName;
        this.img = next.studentImg;
        this.flagStudentLeader = next.flagLeader;
        this.studentId = next.studentId;
        this.teamId = next.teamId;
      });
    }
  }


  logOut() {
    this.tokenStorageService.signOut();
    this.ngOnInit();
  }

  private findProjectIdAndStageId(username: string) {
    this.progressReportService.findProgressDetailByStudentUserName(username).subscribe(next => {
      this.idProject = next.projectId;
      this.idStage = next.stageId;
      console.log(this.idProject, this.idStage);
    })
  }
}
