import {Stage} from './stage';

export interface ProgressDetail {
  progressDetailId: number;
  progressDetailName: string;
  progressDetailPercent: number;
  progressDateStart: string;
  progressDateEnd: string;
  progressStatus: boolean;
  projectId: number;
  stageId: number;
}
