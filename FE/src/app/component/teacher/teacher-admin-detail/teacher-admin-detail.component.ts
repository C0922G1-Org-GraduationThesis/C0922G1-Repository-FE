import {Component, OnInit} from '@angular/core';
import {Teacher} from '../../../model/teacher';
import {TeacherService} from '../../../service/teacher.service';
import {TokenStorageService} from '../../../service/token-storage.service';

@Component({
  selector: 'app-teacher-admin-detail',
  templateUrl: './teacher-admin-detail.component.html',
  styleUrls: ['./teacher-admin-detail.component.css']
})
/**
 * Created by: Phạm Tiến
 * Date: 29/03/2023
 * Component: TeacherAdminDetailComponent
 */
export class TeacherAdminDetailComponent implements OnInit {
  teacherAdmin?: Teacher;
  emailFind?: string;
  role?: string;

  constructor(private teacherService: TeacherService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.role = this.tokenStorageService.getUser().roles[0];
    this.emailFind = this.tokenStorageService.getUser().username;
    this.getTeacherByEmail(this.emailFind);
  }

  getTeacherByEmail(email: string) {
    return this.teacherService.findTeacherByEmail(email).subscribe(next => {
      this.teacherAdmin = next;
      console.log(next);
    });
  }

}
