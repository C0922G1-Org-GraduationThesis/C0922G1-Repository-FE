import {Faculty} from "../model/faculty";
import {Degree} from "../model/degree";


export interface TeacherDtoProgress {
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
