import {Project} from './project';
import {Teacher} from './teacher';

export interface ProgressReview {
  progressReviewId?: number;
  progressReviewTitle?: string;
  progressReviewContent?: string;
  progressReviewPercent?: number;
  progressReviewDateCreate?: string;
  project?: Project;
  teacher?: Teacher;
}
