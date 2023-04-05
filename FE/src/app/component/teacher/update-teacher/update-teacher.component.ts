import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Teacher} from '../../../model/teacher';
import {Faculty} from '../../../model/faculty';
import {Degree} from '../../../model/degree';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TeacherService} from '../../../service/teacher.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import Swal from "sweetalert2";

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.css']
})
export class UpdateTeacherComponent implements OnInit {

  @ViewChild('uploadFile', {static: true}) public avatarDom: ElementRef | undefined;

  selectedImage: any = null;
  teacher: Teacher = {};
  listFaculty: Faculty [] = [];
  listDegree: Degree [] = [];
  linkImg = '';
  formUpdateTeacher: FormGroup = new FormGroup({
    teacherId: new FormControl('', [Validators.required]),
    teacherImg: new FormControl(this.linkImg),
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
  errorsUpdate: any = {
    teacherName: '',
    teacherDateOfBirth: '',
    degree: '',
    teacherAddress: '',
    teacherGender: '',
    teacherPhoneNumber: '',
    faculty: '',
    teacherEmail: '',
  };

  constructor(private teacherService: TeacherService,
              private activatedRoute: ActivatedRoute,
              private storage: AngularFireStorage,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getTeacher();
    this.getListDegree();
    this.getListFaculty();
    console.log(this.teacher);
  }

  getTeacher() {
    this.activatedRoute.paramMap.subscribe(next => {
      // tslint:disable-next-line:radix
      const id = parseInt(next.get('id'));
      this.teacherService.findById(id).subscribe(data => {
        this.formUpdateTeacher.patchValue(data);
        // tslint:disable-next-line:prefer-const
        let teacher: Teacher = this.formUpdateTeacher.value;
        this.linkImg = teacher.teacherImg;
        teacher.teacherId = id;
        console.log(teacher);
      });
    });
  }

  getListDegree() {
    this.teacherService.getAllDegree().subscribe(next => {
      this.listDegree = next;
    });
  }

  getListFaculty() {
    this.teacherService.getAllFaculty().subscribe(next => {
      this.listFaculty = next;
    });
  }

  compareWithDegree(o1: Degree, o2: Degree) {
    return o1 && o2 ? o1.degreeId === o2.degreeId : o1 === o2;
  }

  compareWithFaculty(o1: Faculty, o2: Faculty) {
    return o1 && o2 ? o1.facultyId === o2.facultyId : o1 === o2;
  }

  updateTeacher() {
    if (this.formUpdateTeacher.valid) {
      const teacher: Teacher = this.formUpdateTeacher.value;
      teacher.teacherImg = this.linkImg;
      this.teacherService.updateTeacher(teacher).subscribe(next => {
        Swal.fire({
          icon: 'success',
          title: 'Sửa thành công',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigateByUrl("teachers/list");

      }, er => {
        console.log(er);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < er.error.length; i++) {
          if (er.error[i].field === 'teacherName') {
            this.errorsUpdate.teacherName = er.error[i].defaultMessage;

          } else if (er.error[i].field === 'teacherDateOfBirth') {
            this.errorsUpdate.teacherDateOfBirth = er.error[i].defaultMessage;

          } else if (er.error[i].field === 'degree') {
            this.errorsUpdate.degree = er.error[i].defaultMessage;
          } else if (er.error[i].field === 'teacherAddress') {
            this.errorsUpdate.teacherAddress = er.error[i].defaultMessage;

          } else if (er.error[i].field === 'teacherPhoneNumber') {
            this.errorsUpdate.teacherPhoneNumber = er.error[i].defaultMessage;
          } else if (er.error[i].field === 'faculty') {
            this.errorsUpdate.faculty = er.error[i].defaultMessage;

          } else if (er.error[i].field === 'teacherEmail') {
            this.errorsUpdate.teacherEmail = er.error[i].defaultMessage;
          }
        }
      });
    }
  }

  uploadFileImg() {
    this.selectedImage = this.avatarDom?.nativeElement.files[0];
    this.submit();
  }

  private submit() {
    if (this.selectedImage != null) {
      const filePath = this.selectedImage.name;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => (fileRef.getDownloadURL().subscribe(url => {
          this.linkImg = url;
          console.log('Link ảnh' + url);
        })))
      ).subscribe();
    }
  }

}
