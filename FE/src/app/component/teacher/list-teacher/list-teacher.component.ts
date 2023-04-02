import {Component, OnInit} from '@angular/core';
import {TeacherService} from '../../../service/teacher.service';
import {TeacherDto} from '../../../dto/teacher-dto';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.css']
})
export class ListTeacherComponent implements OnInit {
  teacherPage: TeacherDto[] = [];
  totalPage: number;
  currentPage: number;
  searchName: string;
  teamPage: any;
  teacherId: number;
  teacherName: string;


  constructor(private teacherService: TeacherService) {
  }

  ngOnInit(): void {
    this.totalPage = 0;
    this.searchName = '';
    this.getTeacher();
  }

  getTeacher() {
    this.teacherService.getTeacher(this.searchName, this.currentPage).subscribe(item => {
        this.teacherPage = item.content;
        this.totalPage = item.totalPages;
        this.teamPage = item;
      }, error => {
        Swal.fire({
            title: 'Danh Sách Trống',
            icon: 'info',
            showConfirmButton: false,
            background: '#fff0e6',
            showCancelButton: true,
            cancelButtonText: 'Thoát',
            cancelButtonColor: '#d33'
          }
        );
      }
    );
  }

  search(searchName: string) {
    this.searchName = searchName;
    this.currentPage = 0;
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
      this.getTeacher();
    });
  }
}
