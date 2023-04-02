import {Account} from './account';
import {Degree} from './degree';
import {Faculty} from './faculty';

export interface Teacher {
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
  account?: Account;
  flagDelete?: boolean;
}
