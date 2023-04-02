import {Student} from './student';

export interface Question {
  questionId?: number;
  dateTime?: string;
  questionContent?: string;
  questionTopic?: string;
  studentName?: string;
  studentId?: number;
}
