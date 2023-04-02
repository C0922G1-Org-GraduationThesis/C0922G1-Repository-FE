import {Component, OnInit} from '@angular/core';
import {Question} from '../../../model/question';
import {QuestionService} from '../../../service/question.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questions: Question[] = [];
  totalElement = 1;
  maxElement = 0;
  flag = true;
  question: Question;

  formCreate: FormGroup = new FormGroup({
    questionContent: new FormControl()
    // questionTopic: new FormControl()
  });

  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.getAll();
  }


  getAll() {
    this.questionService.getAllQuestion(this.totalElement).subscribe(
      (data) => {
        this.questions = data.content;
        this.maxElement = data.totalPages;
        console.log(data.content);
      }
    );
  }

  hidden() {
    if (this.totalElement > 1) {
      this.totalElement--;
      this.flag = true;
    }
    this.questionService.getAllQuestion(this.totalElement).subscribe(
      (data) => {
        this.questions = data.content;
        console.log(data.content);
        console.log(this.totalElement);
      }
    );
  }

  loadMore() {
    if (this.totalElement < this.maxElement) {
      this.totalElement++;
    }
    if (this.totalElement === this.maxElement) {
      this.flag = false;
    }
    this.questionService.getAllQuestion(this.totalElement).subscribe(
      (data) => {
        this.questions = data.content;
        console.log(data.content);
        // console.log(data.totalPages);
      }
    );
  }

  create() {
    this.question = this.formCreate.value;
    this.question.studentId = 2;
    this.question.questionTopic = 'Giai doan 3';
    this.questionService.create(this.question).subscribe(data => {
      alert('Them moi thac mac thanh cong');
      this.totalElement++;
      this.getAll();
      this.formCreate.reset();
    });
  }

}
