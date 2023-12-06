import { Priority } from './types';

export interface ITask extends Document {
    _id: string;
    assignee: string;
    description: string;
    priority: Priority;
}

// New tasks do not yet have an _id. Unique _id is generated on the server. 
export interface INewTask extends Document {
    assignee: string;
    description: string;
    priority: Priority;
}

