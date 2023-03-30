import {Teacher} from './teacher';

export interface NotificationTeacher {
  notificationTeacherId?: number;
  notificationTeacherTopic?: string;
  notificationTeacherTime?: string;
  notificationTeacherContent?: string;
  teacherId?: Teacher;
}
