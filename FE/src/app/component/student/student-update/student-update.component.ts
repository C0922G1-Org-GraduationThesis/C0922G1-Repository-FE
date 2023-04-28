import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StudentService} from '../../../service/student/student.service';
import {ClazzService} from '../../../service/clazz/clazz.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Clazz} from '../../../model/clazz';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {Student} from '../../../model/student';
import Swal from "sweetalert2";

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {
  @ViewChild('uploadFile', {static: true}) public avatarDom: ElementRef | undefined;

  clazz: Clazz[] = [];
  selectedImage: any = null;
  arrayPicture = '';

  studentForm: FormGroup = new FormGroup({
    studentId: new FormControl(),
    studentName: new FormControl('', Validators.required),
    studentGender: new FormControl('', Validators.required),
    studentCode: new FormControl(),
    studentDateOfBirth: new FormControl('', Validators.required),
    studentPhoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
    studentEmail: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}')]),
    studentAddress: new FormControl('', Validators.required),
    studentImg: new FormControl(this.arrayPicture),
    clazz: new FormControl(''),
  });

  constructor(private studentService: StudentService,
              private clazzService: ClazzService,
              private activatedRoute: ActivatedRoute,
              private storage: AngularFireStorage,
              private router: Router) {
  }


  ngOnInit(): void {
    this.getStudent();
    this.getClazz();
  }


  getStudent() {
    this.activatedRoute.paramMap.subscribe(param => {
      // tslint:disable-next-line:radix
      const studentId = parseInt(param.get('studentId'));
      this.studentService.findStudentById(studentId).subscribe(next => {
        console.log(next)
        this.studentForm.patchValue(next);

        const student: Student = this.studentForm.value;
        this.arrayPicture = student.studentImg;
        // console.log(this.arrayPicture);
      });
    });
  }

  comparaFn(o1: Clazz, o2: Clazz): boolean {
    return o1 && o2 ? o1.clazzId === o2.clazzId : o1 === o2;
  }

  getClazz() {
    this.clazzService.findAll().subscribe(next => {
      this.clazz = next;
      // console.log(next)
    });
  }

  updateStudent() {
    const student: Student = this.studentForm.value;
    student.studentImg = this.arrayPicture;
    // console.log(student);
    this.studentService.updateStudent(student.studentId, student).subscribe(next => {
      // console.log(next);
      Swal.fire({
        icon: 'success',
        title: 'Cập nhật thành công',
        showConfirmButton: false,
        timer: 1500
      });
      this.studentForm.reset();
      this.router.navigateByUrl('students/list')
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

    this.selectedImage = this.avatarDom?.nativeElement.files[0];
    this.submit();
  }

}
