import {Project} from './project';
import {Stage} from './stage';

export interface ProgressReport {
  progressReportId?: number;
  progressReportContent?: string;
  progressReportTime?: string;
  progressReportFile?: string;
  projectId?: Project;
  stageId?: Stage;
}
