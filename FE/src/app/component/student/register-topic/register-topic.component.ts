import {Component, OnInit} from '@angular/core';
import {Project} from '../../../model/project';
import {ProjectService} from '../../../service/project/project.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register-topic',
  templateUrl: './register-topic.component.html',
  styleUrls: ['./register-topic.component.css']
})
export class RegisterTopicComponent implements OnInit {
  searchStr = '';
  teamPage: any;
  listProject: Project[] = [];
  size = 5;
  currentPage = 0;
  formCreate: FormGroup;

  constructor(private projectService: ProjectService) {
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
    const project = this.formCreate.value;
    console.log(project);
  }
}
