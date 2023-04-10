import {Faculty} from '../faculty';
import {Degree} from '../degree';
import {Account} from '../account';

export interface TeacherDto {
  teacherId?: number;
  teacherCode?: string;
  teacherName?: string;
  teacherDateOfBirth?: string;
  teacherEmail?: string;
  teacherPhoneNumber?: string;
  teacherGender?: boolean;
  teacherAddress?: string;
  teacherImg?: string;
  faculty?: Faculty;
  degree?: Degree;
  flagDelete?: boolean;
}
