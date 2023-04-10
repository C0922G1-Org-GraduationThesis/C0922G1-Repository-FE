import {Team} from '../team';

export interface ProjectDto {
  projectId?: number;
  projectName?: string;
  projectContent?: string;
  projectDescription?: string;
  projectStatus?: boolean;
  projectImg?: string;
  team?: Team;
}
