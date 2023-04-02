import { Component, OnInit } from '@angular/core';
import {Project} from "../../../model/project";

@Component({
  selector: 'app-register-topic',
  templateUrl: './register-topic.component.html',
  styleUrls: ['./register-topic.component.css']
})
export class RegisterTopicComponent implements OnInit {
  searchStr: any;
  teamPage: any;
  listProject: Project[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onSearch() {
  }

  changePage(pageNumber: number) {
  }
}
