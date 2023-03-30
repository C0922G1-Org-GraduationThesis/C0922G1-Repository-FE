import {Teacher} from './teacher';

export interface Team {
  teamId?: number;
  memberOfTeam?: number;
  teamName?: string;
  teacherId?: Teacher;
}
