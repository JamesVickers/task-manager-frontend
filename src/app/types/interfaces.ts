import { Priority } from './types';

export interface ITask extends Document {
    _id?: string; // Optional as new tasks do not yet have an _id. Unique _id is generated on the server. 
    assignee: string;
    description: string;
    priority: Priority;
}

