import {Component, OnInit} from '@angular/core';
import {Student} from '../../../model/student';
import {StudentService} from '../../../service/student/student.service';
import Swal from 'sweetalert2';
import {Team} from '../../../model/team';
import {ActivatedRoute, Router} from '@angular/router';
import {TeamService} from '../../../service/team.service';

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
  studentId?: number;

  constructor(private studentService: StudentService,
              private teamService: TeamService,
              private route: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(param => {
      this.studentId = +param.get('studentId');
      console.log('Mã sinh viên nè', this.studentId);
    });
  }

  ngOnInit(): void {
    this.findAll();
  }

  onSearch() {
    this.currentPage = 0;
    this.listSearchStudent = [];
    this.findAll();
  }

  findAll() {
    this.studentService.findAll(this.searchStr, this.currentPage, this.size).subscribe(data => {
      this.listSearchStudent = data.content.filter(student => !this.listTeam
        .some(teamStudent => teamStudent.studentId === student.studentId));
      this.totalPages = data.totalPages;
      this.teamPage = data;
    }, error => {
      Swal.fire({
        title: 'Lỗi',
        text: 'Không tìm thấy sinh viên!',
        icon: 'error'
      });
    });
  }

  addStudent(id: number) {
    if (this.listTeam.length === 6) {
      Swal.fire({
        title: 'Thông báo',
        text: 'Mỗi nhóm chỉ được 7 thành viên!',
        icon: 'warning'
      });
      return;
    }
    this.studentService.findById(id).subscribe(student => {
      if (!this.listTeam.some(s => s.studentId === student.studentId)) {
        this.listTeam.push(student);
        this.findAll();
      }
    });
  }


  delete(id: number) {
    this.listTeam = this.listTeam.filter(student => student.studentId !== id);
    this.findAll();
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.findAll();
  }

  onSubmit() {
    if (this.listTeam.length === 1) {
      Swal.fire({
        title: 'Thông báo',
        text: 'Mỗi nhóm ít nhất là 3 thành viên!',
        icon: 'warning'
      });
      return;
    }
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
            memberOfTeam: this.listTeam.length + 1
          };
          // Tên nhóm hợp lệ
          this.teamService.saveTeam(newTeam).subscribe(team => {
            // Update leader team
            this.studentService.findById(this.studentId).subscribe(student => {
              this.studentService.updateLeader(this.studentId, student, team.teamId).subscribe(next => {
                console.log(next);
                console.log(team);
                this.route.navigateByUrl('/students/info-team/' + team.teamId);
                Swal.fire({
                  title: 'Thông báo',
                  text: 'Đăng ký nhóm thành công!',
                  icon: 'success'
                });
                this.studentService.sendMailInviteTeam(this.listTeam, team.teamId).subscribe(next => {
                  console.log('GỬi mail thành công rồi nha', next);
                }, error => {
                  console.log('Gửi mail thất bại rồi nha', error)
                })
              }, error => {
                console.log(error);
              });
            });
          }, error => {
            // Tên nhóm bị trùng
            Swal.fire({
              title: 'Thông báo',
              text: 'Đăng ký nhóm thất bại, tên nhóm bị trùng!',
              icon: 'error'
            });
          });
        }
      }
    });
  }

}
