import { Priority } from './types';

export interface ITask extends Document {
    _id: string;
    assignee: string;
    description: string;
    priority: Priority;
    createdAt: string;
    updatedAt: string;
}

// New tasks do not yet have an _id. Unique _id is generated on the server. 
export interface INewTask extends Document {
    assignee: string;
    description: string;
    priority: Priority;
}

export interface ITaskTableProps {
    tasks: ITask[];
  }