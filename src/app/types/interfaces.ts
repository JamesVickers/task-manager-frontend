import { Priority } from './types';

export interface ITask extends Document {
    _id: string;
    assignee: string;
    description: string;
    priority: Priority;
}

