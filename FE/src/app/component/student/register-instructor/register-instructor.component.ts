import {Component, OnInit} from '@angular/core';
import {TeacherDto} from '../../../model/teacher-dto';
import {TeamService} from '../../../service/team.service';
import {FormControl, FormGroup} from '@angular/forms';
import {ProJson} from '../../../model/pro-json';
import {ITeacherDto} from '../../../model/iteacher-dto';
import {ActivatedRoute} from '@angular/router';
import {Team} from '../../../model/team';
import {Teacher} from '../../../model/teacher';
import {ITeamDto} from '../../../model/iteam-dto';
import Swal from "sweetalert2";

@Component({
  selector: 'app-register-instructor',
  templateUrl: './register-instructor.component.html',
  styleUrls: ['./register-instructor.component.css']
})
export class RegisterInstructorComponent implements OnInit {
  editForm: FormGroup;
  instructorList: TeacherDto[] = [];
  instructorName: string;
  instructorId: number;
  // số lượng mặc định của mỗi giáo viên
  default = 2;
  // phân trang
  teamPage!: ProJson;
  teamId: number;
  teacherId: number;
  teacher: ITeacherDto;
  // cờ để hiển thị button
  isRegistered: boolean;
  flag: number;
  team: ITeamDto;

  constructor(private teamService: TeamService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.isRegistered = false;
    this.flag=0;
    this.getAllInstructor(0);
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.teamId = +paramMap.get('id');
      this.teamId = 2;
      this.getTeam(this.teamId);
    });
  }

  getTeacherById(id: number) {
    this.teamService.getTeacherById(id).subscribe(item => {
      this.teacher = item;
    });
  }

  getAllInstructor(page: number) {
    this.teamService.getAllInstructor(page).subscribe(item => {
      // @ts-ignore
      this.instructorList = item.content;
      // @ts-ignore
      this.teamPage = item;
    });

  }

  register(teacherId: number, teacher: string) {
    this.flag=1;
    this.instructorName = teacher;
    this.instructorId = teacherId;
  }

  getTeam(id: number) {
    this.teamService.getTeamById(id).subscribe(item => {
      this.team = item;
      this.editForm = new FormGroup({
        teamId: new FormControl(item.teamId),
        memberOfTeam: new FormControl(item.memberOfTeam),
        teamName: new FormControl(item.teamName),
        teacherId: new FormControl(item.teacherId),
        teacherName: new FormControl(item.teacherName),
      });
      console.log(this.editForm.value);
    });
  }

  submit(teacherId: number, teacher: string) {
    this.instructorName = teacher;
    this.instructorId = teacherId;
    this.editForm.get('teacherId').setValue(teacherId);
    this.editForm.get('teacherName').setValue(teacher);
    this.teamService.editInstructor(this.teamId, this.editForm.value).subscribe(item => {
      this.getAllInstructor(0);
      this.isRegistered = true;
      Swal.fire({
        title: '<span class="animated bounceInDown">Đăng ký thành công!</span>',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        background: '#fff0e6',
        iconHtml: '<i class="fas fa-check"></i>',
      });
    });
  }

  changePage(page: number) {
    this.getAllInstructor(page);
  }

  cancelRegistration() {
    this.flag = 1;
    this.editForm.get('teacherId').setValue(null);
    this.editForm.get('teacherName').setValue(null);
    this.teamService.editInstructor(this.teamId, this.editForm.value).subscribe(item => {
      this.getAllInstructor(0);
      this.isRegistered = false;
      Swal.fire({
        title: '<span class="animated bounceInDown">Hủy đăng ký thành công!</span>',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        background: '#fff0e6',
        iconHtml: '<i class="fas fa-check"></i>',
      });
    });
  }
}
