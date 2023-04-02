import {Question} from './question';
import {Teacher} from './teacher';

export interface Answers {
  answerId?: number;
  answerContent?: string;
  dateTime?: string;
  questionId?: Question;
  teacherId?: Teacher;
}
