import {Team} from './team';

export interface Project {
  projectId?: number;
  projectName?: string;
  projectContent?: string;
  projectDescription?: string;
  projectStatus?: boolean;
  projectImg?: string;
  teamId?: Team;
}
