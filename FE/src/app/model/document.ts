import {Teacher} from './teacher';

export interface Document {
  documentId?: number;
  documentName?: string;
  documentDescribe?: string;
  documentFile?: string;
  flagDelete?: boolean;
  teacherId?: Teacher;
}
