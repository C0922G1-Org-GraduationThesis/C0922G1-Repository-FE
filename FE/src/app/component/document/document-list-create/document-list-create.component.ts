import {HttpErrorResponse, HttpEvent, HttpEventType} from '@angular/common/http';
import {Component, Inject, OnInit} from '@angular/core';
import {FileService} from "../../../service/file.service";
import {saveAs} from 'file-saver';
import {FormControl, FormGroup} from "@angular/forms";
import {DocumentDto} from "../../../dto/document-dto";
import {Document} from "../../../model/document";
import {DocumentService} from "../../../service/document.service";
import {AngularFireStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-document-list-create',
  templateUrl: './document-list-create.component.html',
  styleUrls: ['./document-list-create.component.css']
})
export class DocumentListCreateComponent implements OnInit {
  files: File[] = [];
  filenames: string[] = [];
  fileStatus = {status: '', requestType: '', percent: 0};
  // document: Document;
  selectFile: any | undefined;
  fileName: string = '';
  constructor(private fileService: FileService,
              private documentService: DocumentService,
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
    documentDescribe: new FormControl(),
    documentFile: new FormControl(),
    documentName: new FormControl()
  })

  documentDtoList: DocumentDto [] = [];
  totalPage: number = 0;
  size: number = 0;
  search: string = '';
  p: number = 0;

  formGroup: FormGroup;
  pages: number[] = [];
  role: string = '';
  documentList: Document = {}

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
  }

  createDocument() {
    const document: Document = this.formDocument.value;
    document.documentFile = this.fileName;
    this.documentService.addDocument(document).subscribe(next => {
      console.log(this.fileName)
      alert('Thêm mới thành công');
      this.getAll(this.p);
    })
  }

  getAll(page: number) {
    this.documentService.getAllDocumentDto(this.search.trim(), page).subscribe(data => {
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
        alert("Xóa thành công");
        this.getAll(this.p);
      })
    } else {
      alert("Xóa không thành công");
    }
    // this.groundFootballDtoService.deleteGF(id).subscribe(data => {
    //   if (data != null) {
    //     console.log(data);
    //     alert("Xóa thành công")
    //   }
    // }, error => {
    //   alert("Xóa thất bại")
    // });
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

  dow(filename:string) {
    this.fileService.download(filename).subscribe(next =>{

    })
  }

}
