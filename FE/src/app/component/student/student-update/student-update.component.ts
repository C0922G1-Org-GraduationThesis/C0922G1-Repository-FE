import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StudentService} from '../../../service/student/student.service';
import {ClazzService} from '../../../service/clazz/clazz.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {Clazz} from '../../../model/clazz';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {Student} from '../../../model/student';

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
    studentName: new FormControl(),
    studentGender: new FormControl(),
    studentCode: new FormControl(),
    studentDateOfBirth: new FormControl(),
    studentPhoneNumber: new FormControl(),
    studentEmail: new FormControl(),
    studentAddress: new FormControl(),
    studentImg: new FormControl(this.arrayPicture),
    clazz: new FormControl(),
  });

  constructor(private studentService: StudentService,
              private clazzService: ClazzService,
              private activatedRoute: ActivatedRoute,
              private storage: AngularFireStorage) {
  }


  ngOnInit(): void {
    this.getStudent();
    this.getClazz();
  }

  getStudent() {
    this.activatedRoute.paramMap.subscribe(param => {
      // tslint:disable-next-line:radix
      const studentId = parseInt(param.get('studentId'));
      this.studentService.findById(studentId).subscribe(next => {
        this.studentForm.patchValue(next);

        const student: Student = this.studentForm.value;
        this.arrayPicture = student.studentImg;
        console.log(this.arrayPicture);
        console.log(student);
      });
    });
  }

  getClazz() {
    this.clazzService.findAll().subscribe(next => {
      this.clazz = next;
    });
  }

  updateStudent() {
    const student = this.studentForm.value;
    console.log(student);
    this.studentService.updateStudent(student.studentId, student).subscribe(next => {
      console.log(next);
      alert('Đã cập nhật thành công');
      this.studentForm.reset();
    });
  }

  comparaFn(o1: Clazz, o2: Clazz): boolean {
    return o1 && o2 ? o1.clazzId === o2.clazzId : o1 === o2;
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

}
