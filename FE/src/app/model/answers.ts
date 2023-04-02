import {Question} from './question';
import {Teacher} from './teacher';

export interface Answers {
  answerId?: number;
  answerContent?: string;
  question?: Question;
  teacher?: Teacher;
}
