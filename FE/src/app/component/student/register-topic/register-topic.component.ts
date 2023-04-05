import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Project} from '../../../model/project';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../../service/project.service';
import {ActivatedRoute} from "@angular/router";
import {TeamService} from "../../../service/team.service";
import {Team} from "../../../model/team";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-register-topic',
  templateUrl: './register-topic.component.html',
  styleUrls: ['./register-topic.component.css']
})
export class RegisterTopicComponent implements OnInit {
  @ViewChild('uploadFile', {static: true}) public avatarDom: ElementRef | undefined;
  @ViewChild('uploadFile1', {static: true}) public avatarDomDes: ElementRef | undefined;
  searchStr = '';
  teamPage: any;
  listProject: Project[] = [];
  size = 5;
  currentPage = 0;
  formCreate: FormGroup;
  teamId: number;
  team: Team;
  selectedFile: any = null;
  fileUrl: string;
  fileUrlDes: string;
  selectedFileDes: any = null;

  constructor(private projectService: ProjectService,
              private activatedRoute: ActivatedRoute,
              private teamService: TeamService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.teamId = +paramMap.get('teamId');
      this.teamService.findById(this.teamId).subscribe(team => {
        this.team = team;
      });
    });
  }

  ngOnInit(): void {
    this.onSearch();
    this.initForm();
  }

  initForm() {
    this.formCreate = new FormGroup({
      projectName: new FormControl('', [Validators.required,
        Validators.pattern('^[A-Z][a-zA-ZÀ-Ỹà-ỹ0-9\\s]{4,44}[a-zA-ZÀ-Ỹà-ỹ0-9]?$'),
        Validators.minLength(15),
        Validators.maxLength(250)]),
      projectContent: new FormControl('', [Validators.required,
        Validators.maxLength(10000),
        Validators.minLength(50)]),
      projectDescription: new FormControl('', [Validators.required]),
      projectImg: new FormControl('', [Validators.required])
    });
  }

  onSearch() {
    this.projectService.findAll(this.searchStr, this.currentPage, this.size).subscribe(data => {
      console.log(data);
      this.listProject = data.content;
      this.teamPage = data;
    });
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.onSearch();
  }

  onSubmit() {
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
    if (this.selectedFileDes != null) {
      const filePath = this.selectedFileDes.name;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.selectedFileDes);

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().toPromise().then(url => {
            this.fileUrlDes = url;
            console.log(this.fileUrlDes);
          });
        })
      ).subscribe();
    }
    this.formCreate.value.projectDescription = this.fileUrlDes;
    this.formCreate.value.projectImg = this.fileUrl;
    const project = this.formCreate.value;
    console.log(project);
  }

  uploadFileImg() {
    this.selectedFile = this.avatarDom?.nativeElement.files[0];
    this.onSubmit();
  }

  uploadFileDes() {
    this.selectedFileDes = this.avatarDomDes?.nativeElement.files[0];
    this.onSubmit();
  }
}
