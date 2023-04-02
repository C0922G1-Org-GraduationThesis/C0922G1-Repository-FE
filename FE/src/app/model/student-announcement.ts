import {Student} from './student';
import {Announcement} from './announcement';

export interface StudentAnnouncement {
  studentAnnouncementId?: number;
  student?: Student;
  announcement?: Announcement;
}
