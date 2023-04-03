import {Component, OnInit} from '@angular/core';
import {Student} from '../../../model/student';
import {StudentService} from '../../../service/student/student.service';
import Swal from 'sweetalert2';
import {TeamService} from '../../../service/team/team.service';
import {Team} from '../../../model/team';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-team',
  templateUrl: './register-team.component.html',
  styleUrls: ['./register-team.component.css']
})
export class RegisterTeamComponent implements OnInit {
  searchStr = '';
  totalPages: number;
  size = 4;
  currentPage = 0;
  listSearchStudent: Student[];
  listTeam: Student[] = [];
  teamPage: any;

  constructor(private studentService: StudentService,
              private teamService: TeamService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.onSearch();
  }

  onSearch() {
    this.studentService.findAll(this.searchStr, this.currentPage, this.size).subscribe(data => {
      console.log(data);
      this.listSearchStudent = data.content.filter(student => !this.listTeam
        .some(teamStudent => teamStudent.studentId === student.studentId));
      this.totalPages = data.totalPages;
      this.teamPage = data;
    }, error => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
      Toast.fire({
        icon: 'error',
        title: 'Tên hoặc MSSV không tồn tại'
      });
    });
  }

  addStudent(id: number) {
    this.studentService.findById(id).subscribe(student => {
      if (!this.listTeam.some(s => s.studentId === student.studentId)) {
        this.listTeam.push(student);
        this.onSearch();
      }
    });
  }


  delete(id: number) {
    this.listTeam = this.listTeam.filter(student => student.studentId !== id);
    this.onSearch();
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.onSearch();
  }

  onSubmit() {
    const validGroupNameRegex = /^[A-Z][a-zA-ZÀ-Ỹà-ỹ0-9\s]{4,44}[a-zA-ZÀ-Ỹà-ỹ0-9]?$/;
    Swal.fire({
      title: 'Nhập tên nhóm',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Lưu',
      cancelButtonText: 'Hủy',
      showLoaderOnConfirm: true,
      customClass: {
        confirmButton: 'custom-class' // Thêm thuộc tính customClass và đặt giá trị của nó là tên class CSS bạn đã tạo ở bước 1
      },
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: (groupName) => {
        if (!groupName) {
          Swal.showValidationMessage('Tên nhóm không được để trống');
        } else if (!/^[A-Z]/.test(groupName)) {
          Swal.showValidationMessage('Tên nhóm phải bắt đầu bằng chữ cái viết hoa');
        } else if (groupName.length < 5) {
          Swal.showValidationMessage('Tên nhóm quá ngắn (tối thiểu 5 ký tự)');
        } else if (groupName.length > 45) {
          Swal.showValidationMessage('Tên nhóm quá dài (tối đa 45 ký tự)');
        } else if (!validGroupNameRegex.test(groupName)) {
          Swal.showValidationMessage('Tên nhóm không hợp lệ');
        } else {
          const newTeam: Team = {
            teamName: groupName,
            memberOfTeam: 0
          };
          // Tên nhóm hợp lệ
          this.teamService.saveTeam(newTeam).subscribe(team => {
            console.log(team);
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              }
            });
            this.route.navigateByUrl('/students/info-team/' + team.teamId);
            Toast.fire({
              icon: 'success',
              title: 'Đăng ký nhóm thành công'
            });

          }, error => {
            // Tên nhóm bị trùng
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              }
            });
            Toast.fire({
              icon: 'error',
              title: 'Tên nhóm bị trùng, vui lòng chọn tên khác'
            });
          });
        }
      }
    });
  }
}
