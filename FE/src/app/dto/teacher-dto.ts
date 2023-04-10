import {Faculty} from '../model/faculty';
import {Degree} from '../model/degree';
import {Account} from '../model/account';

export interface TeacherDto {
  teacherId?: number;
  teacherName?: string;
  teacherCode?: string;
  teacherEmail?: string;
  teacherPhoneNumber?: string;
  teacherImg?: string;
  faculty?: string;
  degree?: string;
}
