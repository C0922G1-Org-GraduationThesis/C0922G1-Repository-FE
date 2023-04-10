import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {saveAs} from 'file-saver';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DocumentDto} from '../../../dto/document-dto';
import {Document} from '../../../model/document';
import {AngularFireStorage} from '@angular/fire/storage';
import {NotificationTeacher} from '../../../model/notification-teacher';
import {finalize} from "rxjs/operators";
import Swal from "sweetalert2";
import {FileService} from "../../../service/file.service";
import {DocumentService} from "../../../service/document.service";
import {TokenStorageService} from "../../../service/token-storage.service";
import {Teacher} from "../../../model/teacher";
import {TeacherService} from "../../../service/teacher.service";

@Component({
  selector: 'app-document-list-create',
  templateUrl: './document-list-create.component.html',
  styleUrls: ['./document-list-create.component.css']
})
export class DocumentListCreateComponent implements OnInit {
  @ViewChild('uploadFile', {static: true}) public avatarDom: ElementRef | undefined;
  teamPage: any = null;
  selectedFile: any = null;
  files: File[] = [];
  filenames: string[] = [];
  fileStatus = {status: '', requestType: '', percent: 0};
  selectFile: any | undefined;
  fileName: string = '';
  documentDtoList: DocumentDto [] = [];
  totalPage: number = 0;
  size: number = 0;
  search: string = '';
  p: number = 0;

  formGroup: FormGroup;
  pages: number[] = [];
  role: string = '';
  documentList: Document = {};
  roleUser?: string;
  userNameTeach?: string;
  teacher?: Teacher;

  errCreateDocument: any = {
    documentName: '',
    documentDescribe: ''
  };
  fileUrl: string;

  constructor(private fileService: FileService,
              private documentService: DocumentService,
              private tokenStorageService: TokenStorageService,
              private teacherService: TeacherService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
  ) {
    this.formGroup = new FormGroup({
      search: new FormControl('')
    });
  }


  // define a function to upload files
  onUploadFiles(files: File[]): void {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file, file.name);
    }
    this.fileService.upload(formData).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  // define a function to download files
  onDownloadFile(filename: string): void {
    console.log(filename);
    this.fileService.download(filename).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );

  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
            {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
          saveAs(new Blob([httpEvent.body!],
              {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
            httpEvent.headers.get('File-Name'));
        }
        this.fileStatus.status = 'done';
        break;
      default:
        console.log(httpEvent);
        break;

    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }

  formDocument: FormGroup = new FormGroup({
    documentDescribe: new FormControl('', [Validators.required]),
    documentFile: new FormControl(),
    documentName: new FormControl('', [Validators.required])
  });


// Hàm để tạo danh sách các trang
  private createPageList() {
    this.pages = [];
    if (this.totalPage > 0 && this.documentDtoList.length > 0) { // chỉ hiển thị phân trang nếu có nhiều hơn 1 trang và có kết quả tìm kiếm
      const start = Math.max(this.p - 2, 0);
      const end = Math.min(start + 4, this.totalPage - 1);
      for (let i = start; i <= end; i++) {
        this.pages.push(i);
      }
    } else {
      this.pages.push(0); // nếu không hiển thị phân trang thì chỉ có nút button ở trang 1
    }
  }

  // Hàm để lấy dữ liệu khi chuyển sang trang mới

  private goToPageInternal(page: number) {
    this.p = page;
    this.getAll(this.p);
    this.createPageList();
  }


  ngOnInit(): void {
    this.getAll(this.p);
    this.createPageList();
    this.roleUser = this.tokenStorageService.getUser().roles[0];
    this.userNameTeach = this.tokenStorageService.getUser().username;
    console.log(this.userNameTeach)
    this.teacherService.findTeacherByEmail(this.userNameTeach).subscribe(next => {
      this.teacher = next
      this.formDocument.value.teacherId = this.teacher;
      this.formDocument.value.flagDelete = 0;
    })
  }

  createDocument() {



    if (this.selectedFile != null) {
      const filePath = this.selectedFile.name;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.selectedFile);

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().toPromise().then(url => {
            this.fileUrl = url;
            console.log(this.fileUrl);
          });
        })
      ).subscribe();
    }
    this.formDocument.value.documentFile = this.fileUrl;

    if (this.formDocument.valid) {
      const document: Document = this.formDocument.value;
      // document.documentFile = this.fileName;
      this.documentService.addDocument(document).subscribe(next => {
        console.log(this.fileName);
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
          icon: 'success',
          title: 'Thêm tài liệu hướng dẫn thành công'
        }).then(() => {
          setTimeout(() => {
            location.reload();
          }, 500); // đợi 3 giây trước khi load lại trang
        });


        this.formDocument.reset();
        this.getAll(this.p);

      }, er => {
        console.log(er);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < er.error.length; i++) {
          if (er.error[i].field === 'documentName') {
            this.errCreateDocument.documentName = er.error[i].defaultMessage;
          } else if (er.error[i].field === 'documentDescribe') {
            this.errCreateDocument.documentDescribe = er.error[i].defaultMessage;
          }
        }
      });
    }

  }


  getAll(page: number) {
    this.documentService.getAllDocumentDto(this.search.trim(), page).subscribe(data => {
      this.teamPage = data;
      // @ts-ignore
      this.documentDtoList = data['content'];
      // @ts-ignore
      this.totalPage = data['totalPages'];
      // @ts-ignore
      this.p = data['number'];
      // @ts-ignore
      this.size = data['size'];
      console.log(this.documentDtoList);
    });

    this.createPageList();
  }

  previousPage() {
    if (this.p > 0) {
      this.goToPageInternal(this.p - 1);
    }
  }

  nextPage() {
    if (this.p < this.totalPage - 1) {
      this.goToPageInternal(this.p + 1);
    }
  }

  previousPageTen() {
    if (this.p > 10) {
      this.goToPageInternal(this.p - 10);
    }
  }

  nextPageTen() {
    if (this.p < this.totalPage - 9) {
      this.goToPageInternal(this.p + 10);
    }
  }

  searchNameDocument() {
    // this.p = 0;
    // this.ngOnInit();
    this.documentDtoList = [];
    this.documentService.getAllDocumentDto(this.formGroup.value.search.trim(), 0).subscribe(data => {
      // @ts-ignore
      this.documentDtoList = data['content'];
      // @ts-ignore
      this.totalPage = data['totalPages'];
      // @ts-ignore
      this.p = data['number'];
      // @ts-ignore
      this.size = data['size'];
      console.log(data);
    });

    this.createPageList();
    console.log('abc' + this.formGroup.value.search);
  }


  goToPage(page: number) {
    this.p = page;
    this.goToPageInternal(page);
    // Do something to load data for the new page
  }

  deleteDocument(id: any) {
    if (id != null) {
      this.documentService.deleteDocument(id).subscribe(data => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });
        Toast.fire({
          icon: 'success',
          title: 'Xoá tài liệu hướng dẫn thành công'
        }).then(() => {
          setTimeout(() => {
            location.reload();
          }, 500); // đợi 3 giây trước khi load lại trang
        });
        this.getAll(this.p);
      });
    } else {
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
        title: 'Xoá tài liệu hướng dẫn không thành công'
      })
    }
  }


  onChange($event: any) {
    // @ts-ignore
    this.selectFile = event.target.files[0];
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileName = file.name;
    console.log('Tên tệp: ', this.fileName);

  }

  dow(filename: string) {
    this.fileService.download(filename).subscribe(next => {

    });
  }

  uploadFileImg() {
    this.selectedFile = this.avatarDom?.nativeElement.files[0];
    this.createDocument();
  }
}
