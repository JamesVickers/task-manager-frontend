'use client'

import React from 'react';
import { useQuery, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ITask } from '../types/interfaces';
import useForm from '../utils/hooks/useForm';
import { Priority } from '../types/types';

const Tasks = (): JSX.Element => {
    // Query logic
    const getAllTasks = () => axios.get('http://localhost:8888/tasks/get/all');

    const {
        isLoading,
        data,
        isError,
        error
    }: {
        isLoading: boolean,
        data: any,
        isError: boolean,
        error: AxiosError | null
    } = useQuery('getAllTasks', getAllTasks);

    const postTask = (newTask: ITask) => axios.post('http://localhost:8888/tasks/create/task', newTask);

    const { mutate: createTask } = useMutation(postTask);

    // Form state
    const { inputs, handleChange, resetForm } = useForm({
        assignee: '',
        description: '',
        priority: '',
    });

    // Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let parsedValue = name === 'priority' ? parseInt(value) : value;
        handleChange(name, parsedValue);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, newTask: ITask) => { // Todo: configure this to accept interface ITask
        e.preventDefault();
        createTask(newTask);
    };

    return (
        <main>
            <form>
                <label>
                    Assignee:
                    <input
                        type='text'
                        id='assignee'
                        name='assignee'
                        placeholder={'Add an assignee'}
                        alt={'form input assignee'}
                        value={inputs.assignee}
                        onChange={(e) => handleInputChange(e)}
                    />
                </label>
                <label>
                    Description:
                    <input
                        type='text'
                        id='description'
                        name='description'
                        placeholder={'Add an description'}
                        alt={'form input description'}
                        value={inputs.description}
                        onChange={(e) => handleInputChange(e)}
                    />
                </label>
                <label>
                    Priority:
                    <input
                        type='number'
                        id='priority'
                        name='priority'
                        placeholder={'Add an priority'}
                        alt={'form input priority'}
                        value={inputs.priority}
                        onChange={(e) => handleInputChange(e)}
                    />
                </label>
                <input type='submit' value='Submit' onClick={(e) => handleSubmit(e, inputs)} />
                <button type='button' onClick={resetForm}>Reset</button>
            </form>
            {isError && <h2>{error?.message}</h2>}
            {isLoading && <h2>Loading...</h2>}
            {!isError && !isLoading && (
                <div>
                    {data?.data.tasks && <h2>Task count: {data?.data.tasks.length}</h2>}
                    {data?.data.tasks && data.data.tasks.map((task: ITask) => {
                        const { _id: id, assignee, description, priority } = task;
                        const uniqueKey: string = uuidv4();
                        return (
                            <div key={uniqueKey}>
                                <ul>
                                    <li>{id}</li>
                                    <li>{assignee}</li>
                                    <li>{description}</li>
                                    <li>{priority}</li>
                                </ul>
                            </div>
                        )
                    })}
                </div>
            )}
        </main>
    )
}

export default Tasks;
