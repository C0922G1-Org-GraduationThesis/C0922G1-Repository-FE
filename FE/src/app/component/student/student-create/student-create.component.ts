import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Clazz} from '../../../model/clazz';
import {ClazzService} from '../../../service/clazz/clazz.service';
import {StudentService} from '../../../service/student/student.service';
import {FormControl, FormGroup, Validator, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Student} from '../../../model/student';
import Swal from "sweetalert2";
import {Router} from "@angular/router";


@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  constructor(private clazzService: ClazzService,
              private studentService: StudentService,
              private storage: AngularFireStorage,
              private  router: Router) {
  }


  clazzType: Clazz[];
  selectedImage: any = null;
  arrayPicture = '';

  studentForm: FormGroup = new FormGroup({
    studentName: new FormControl('', Validators.required),
    studentGender: new FormControl('', Validators.required),
    // studentCode: new FormControl(),
    studentDateOfBirth: new FormControl('', Validators.required),
    studentPhoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(11) ]),
    studentEmail: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}')]),
    studentAddress: new FormControl('', Validators.required),
    studentImg: new FormControl(this.arrayPicture="https://bathanh.com.vn/wp-content/uploads/2017/08/default_avatar.png"),
    clazz: new FormControl('', Validators.required),
  });

  @ViewChild('uploadFile', {static: true}) public avatarDom: ElementRef | undefined;

  ngOnInit(): void {
    this.clazzService.findAll().subscribe(next => {
      this.clazzType = next;
    });
  }


  submit() {
    if (this.selectedImage != null) {
      const filePath = this.selectedImage.name;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => (fileRef.getDownloadURL().subscribe(url => {
          this.arrayPicture = url;
          console.log(url);
        })))
      ).subscribe();
    }
  }

  uploadFileImg() {
    this.selectedImage = this.avatarDom?.nativeElement.files[0];
    this.submit();
  }

  addStudent() {
    const student: Student = this.studentForm.value;
    student.studentImg = this.arrayPicture;
    this.studentService.createStudent(student).subscribe(next => {
      console.log(next);
      Swal.fire({
        icon: 'success',
        title: 'Thêm mới thành công',
        showConfirmButton: false,
        timer: 1500
      });
      this.studentForm.reset();
      this.router.navigateByUrl('students/list')
    });
  }



}
