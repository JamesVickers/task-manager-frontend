'use client'

import React from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { INewTask } from '../types/interfaces';
import useForm from '../utils/hooks/useForm';
import TasksTable from '../components/tables/TaskTable';

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

    const postTask = (newTask: INewTask) => axios.post('http://localhost:8888/tasks/create/task', newTask);

    const queryClient = useQueryClient();

    const { mutate: createTask } = useMutation(postTask, {
        onSuccess: () => {
            queryClient.invalidateQueries('getAllTasks'); // Refetch getAllTasks on createTask success to refresh tasks list automatically
        }
    });

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, newTask: INewTask) => {
        e.preventDefault();
        createTask(newTask);
        resetForm();
    };

    return (
        <main>
            <form onSubmit={(e) => handleSubmit(e, inputs)}>
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
                <input type='submit' value='Submit' />
                <button type='button' onClick={resetForm}>Reset</button>
            </form>
            {isError && <h2>{error?.message}</h2>}
            {isLoading && <h2>Loading...</h2>}
            {!isError && !isLoading && (
                <>
                    {data?.data.tasks && (
                        <TasksTable tasks={data?.data.tasks} />
                    )}
                </>
            )}
        </main>
    )
}

export default Tasks;
