import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../../service/token-storage.service";
import {ShareService} from "../../../service/share.service";
import {TeacherService} from "../../../service/teacher.service";
import {StudentService} from "../../../service/student/student.service";
import {ProgressService} from "../../../service/progress.service";
import {ProgressReportService} from "../../../service/progress-report.service";
import {Team} from "../../../model/team";
import {Announcement} from "../../../model/announcement";
import {AnnouncementService} from "../../../service/announcement.service";
import {Route, Router} from "@angular/router";

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
  listAnnouncement: Announcement[];
  idTeam: number;
  nameNoti: string;

  constructor(private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private teacherService: TeacherService,
              private studentService: StudentService,
              private progressReportService: ProgressReportService,
              private announcementService: AnnouncementService,
              private route: Router) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
    this.findNameUser();
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
        console.log('student', next)
        this.name = next.studentName;
        this.img = next.studentImg;
        this.flagStudentLeader = next.flagLeader;
        this.studentId = next.studentId;
        this.teamId = next.team;
        this.findAllAnnouncement(this.studentId);
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

  findAllAnnouncement(studentId: number) {
    this.announcementService.findAll(studentId).subscribe(announcements => {
      this.listAnnouncement = announcements;
      this.idTeam = +announcements[0].attach;
      this.nameNoti = announcements[0].announcementContent;
    });
  }

  notJoin() {
    this.announcementService.notJoin(this.idProject).subscribe(next => {
      console.log(next)
    })
  }

  joinTeam() {
    this.announcementService.joinTeam(this.studentId, this.idTeam, this.idProject).subscribe(next => {
      this.route.navigateByUrl('/students/info-team/' + this.idTeam);
    })
  }

  resetAnnouncement() {
    this.listAnnouncement = [];
  }
}
