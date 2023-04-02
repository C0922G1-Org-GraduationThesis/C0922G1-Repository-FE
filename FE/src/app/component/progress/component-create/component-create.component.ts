import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {QuestionService} from '../../../service/question.service';
import {Question} from '../../../model/question';

@Component({
  selector: 'app-component-create',
  templateUrl: './component-create.component.html',
  styleUrls: ['./component-create.component.css']
})
export class ComponentCreateComponent implements OnInit {
  questions: Question[] = [];

  formCreate: FormGroup = new FormGroup({
    questionId: new FormControl(),
    questionContent: new FormControl(),
    questionTopic: new FormControl(),
    dateTime: new FormControl()
  });

  constructor(private router: Router, private questionService: QuestionService) {
  }

  ngOnInit(): void {
  }

  create() {
    this.questionService.create(this.formCreate.value).subscribe(data => {
      this.router.navigateByUrl('');
      alert('Them moi thac mac thanh cong');
    });
  }


}
