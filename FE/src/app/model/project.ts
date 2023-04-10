import {Team} from './team';

export interface Project {
  projectId?: number;
  projectName?: string;
  projectContent?: string;
  projectDescription?: string;
  projectStatus?: Boolean;
  projectImg?: string;
  team?: Team;
}
