import {TeacherDto} from './teacher-dto';
import {ProjectDto} from './project-dto';

export interface ProgressReviewDto {
  progressReviewId?: number;
  progressReviewTitle?: string;
  progressReviewContent?: string;
  progressReviewPercent?: number;
  progressReviewDateCreate?: string;
  projectDto?: ProjectDto;
  teacherDto?: TeacherDto;
}
