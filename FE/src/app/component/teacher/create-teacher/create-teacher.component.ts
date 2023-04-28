import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Degree} from '../../../model/degree';
import {AngularFireStorage} from '@angular/fire/storage';
import {Faculty} from '../../../model/faculty';
import {TeacherService} from '../../../service/teacher.service';
import {finalize} from 'rxjs/operators';
import {Teacher} from '../../../model/teacher';
import Swal from "sweetalert2";
import {Router} from "@angular/router";


@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css']
})
export class CreateTeacherComponent implements OnInit {
  @ViewChild('uploadFile', {static: true}) public avatarDom: ElementRef | undefined;

  selectedImage: any = null;
  arrayPicture = 'https://bathanh.com.vn/wp-content/uploads/2017/08/default_avatar.png';
  formCreateTeacher: FormGroup = new FormGroup({
    img: new FormControl(this.arrayPicture),
    teacherName: new FormControl('', [Validators.required]),
    teacherDateOfBirth: new FormControl('', [Validators.required]),
    degree: new FormControl('', [Validators.required]),
    teacherAddress: new FormControl('', [Validators.required]),
    teacherGender: new FormControl('', [Validators.required]),
    teacherPhoneNumber: new FormControl('', [Validators.required]),
    faculty: new FormControl('', [Validators.required]),
    teacherEmail: new FormControl('', [Validators.required]),
  });
  faculty: Faculty = {
    facultyName: ''
  };
  degree: Degree = {
    degreeName: ''
  };
  listDegree: Degree [] = [];
  listFaculty: Faculty [] = [];

  errorsCreate: any = {
    teacherName: '',
    teacherDateOfBirth: '',
    degree: '',
    teacherAddress: '',
    teacherGender: '',
    teacherPhoneNumber: '',
    faculty: '',
    teacherEmail: '',
  };

  constructor(private storage: AngularFireStorage,
              private teacherService: TeacherService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAllFaculty();
    this.getAllDegree();
  }

  submit() {
    let timerInterval
    Swal.fire({
      title: 'Vui lòng đợi trong giây lát!',
      html: 'Quá trình tải ảnh lên sẽ hoàn tất trong <b></b> milliseconds.',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = String(Swal.getTimerLeft())
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    });

    if (this.selectedImage != null) {
      const filePath = this.selectedImage.name;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => (fileRef.getDownloadURL().subscribe(url => {
          this.arrayPicture = url;
          console.log('Link ảnh' + url);
        })))
      ).subscribe();
    }
  }


  uploadFileImg() {
    this.selectedImage = this.avatarDom?.nativeElement.files[0];
    this.submit();
  }

  getAllDegree() {
    this.teacherService.getAllDegree().subscribe(next => {
      this.listDegree = next;
    });
  }

  getAllFaculty() {
    this.teacherService.getAllFaculty().subscribe(next => {
      this.listFaculty = next;
    });
  }

  createTeacher() {
    if (this.formCreateTeacher.valid) {
      const teacher: Teacher = this.formCreateTeacher.value;
      teacher.teacherImg = this.arrayPicture;
      this.teacherService.addTeacher(teacher).subscribe(next => {
        this.formCreateTeacher.reset();
        this.createTeacher();
        this.arrayPicture = 'https://bathanh.com.vn/wp-content/uploads/2017/08/default_avatar.png';
        Swal.fire({
          icon: 'success',
          title: 'Thêm mới thành công',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigateByUrl("teachers/list");
      }, er => {
        console.log(er);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < er.error.length; i++) {
          if (er.error[i].field === 'teacherName') {
            this.errorsCreate.teacherName = er.error[i].defaultMessage;

          } else if (er.error[i].field === 'teacherDateOfBirth') {
            this.errorsCreate.teacherDateOfBirth = er.error[i].defaultMessage;

          } else if (er.error[i].field === 'degree') {
            this.errorsCreate.degree = er.error[i].defaultMessage;
          } else if (er.error[i].field === 'teacherAddress') {
            this.errorsCreate.teacherAddress = er.error[i].defaultMessage;

          } else if (er.error[i].field === 'teacherPhoneNumber') {
            this.errorsCreate.teacherPhoneNumber = er.error[i].defaultMessage;
          } else if (er.error[i].field === 'faculty') {
            this.errorsCreate.faculty = er.error[i].defaultMessage;

          } else if (er.error[i].field === 'teacherEmail') {
            this.errorsCreate.teacherEmail = er.error[i].defaultMessage;
          }
        }
      });
    }
  }
}
