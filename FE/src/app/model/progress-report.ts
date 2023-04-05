import {Project} from './project';
import {Stage} from './stage';

export interface ProgressReport {
  progressReportId?: number;
  progressReportContent?: string;
  progressReportTime?: string;
  progressReportFile?: string;
  progressReportFileName?: string;
  project?: Project;
  stage?: Stage;
}
