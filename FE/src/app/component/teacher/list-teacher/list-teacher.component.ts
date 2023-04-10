import {Component, OnInit} from '@angular/core';
import {TeacherService} from '../../../service/teacher.service';
import {TeacherDto} from '../../../dto/teacher-dto';
import Swal from 'sweetalert2';
import {TeamService} from "../../../service/team.service";
import {ITeacherDto} from "../../../model/iteacher-dto";


@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.css']
})
export class ListTeacherComponent implements OnInit {
  teacherPage: TeacherDto[] = [];
  currentPage: number;
  searchName: string;
  teamPage: any;
  teacherId: number;
  teacherName: string;
  teacher: ITeacherDto;


  constructor(private teacherService: TeacherService,
              private teamService : TeamService) {
  }

  ngOnInit(): void {
    this.searchName = '';
    this.currentPage=0;
    this.getTeacher();
  }

  getTeacherById(id: number) {
    this.teamService.getTeacherById(id).subscribe(item => {
      this.teacher = item;
    });
  }

  getTeacher() {
    this.teacherService.getTeacher(this.searchName, this.currentPage).subscribe(item => {
        this.teacherPage = item.content;
        this.teamPage = item;
      }
    );
  }

  search(searchName: string) {
    this.searchName = searchName;
    this.currentPage = 0;
    this.teacherPage = [];
    this.getTeacher();

  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getTeacher();
  }


  getInfo(teacherId: number, teacherName: string) {
    this.teacherId = teacherId;
    this.teacherName = teacherName;
  }

  deleteTeacherById() {
    this.teacherService.deleteTeacherById(this.teacherId).subscribe(() => {
      Swal.fire({
        title: '<span class="animated bounceInDown">Xóa thành công!</span>',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        background: '#fff0e6',
        iconHtml: '<i class="fas fa-check"></i>',
      });
      debugger
      this.ngOnInit();
    });
  }
}
