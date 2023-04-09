import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../service/token-storage.service';
import {Student} from '../../../model/student';
import {StudentService} from "../../../service/student/student.service";


@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
/**
 * Created by: Phạm Tiến
 * Date: 29/03/2023
 * Component: StudentDetailComponent
 */
export class StudentDetailComponent implements OnInit {
  studentDetail?: Student;
  emailFind?: string;

  constructor(private studentService: StudentService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.emailFind = this.tokenStorageService.getUser().username;
    this.getStudentByEmail(this.emailFind);
  }
  /**
   * Created by: TienP
   * Date: 03/04/2023
   * function: getStudentByEmail
   */
  getStudentByEmail(email: string) {
    return this.studentService.findStudentByEmail(email).subscribe(next => {
      this.studentDetail = next;
    });
  }

}
