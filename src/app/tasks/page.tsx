'use client'

import React, { ChangeEvent, useState } from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { TextField, Button } from '@mui/material';
import { INewTask, ITask } from '../types/interfaces';
import useForm from '../utils/hooks/useForm';
import TasksTable from '../components/tables/TaskTable';

const Tasks = (): JSX.Element => {
    // State 
    const [selectedTaskIds, setSelectedTaskIds] = useState<string[] | undefined>([]);

    /* Query logic */

    const queryClient = useQueryClient();

    // Query all tasks
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

    // Create task
    const createTaskAxios = (newTask: INewTask) => axios.post('http://localhost:8888/tasks/create/task', newTask);

    const { mutate: createTask } = useMutation(createTaskAxios, {
        onSuccess: () => {
            queryClient.invalidateQueries('getAllTasks'); // Refetch getAllTasks on createTask success to refresh tasks list automatically
        }
    });

    // Delete tasks
    const deleteTasksAxios = (taskIds: string[] | undefined) => {
        return axios.delete('http://localhost:8888/tasks/delete/tasks', {
            data: { ids: taskIds }
        });
    };

    const { mutate: deleteTasks } = useMutation(deleteTasksAxios, {
        onSuccess: () => {
            queryClient.invalidateQueries('getAllTasks'); // Refetch getAllTasks on deleteTasks success to refresh tasks list automatically
        }
    });

    // Update task
    const updateTaskAxios = (editedTask: ITask) => axios.put('http://localhost:8888/tasks/update/task', editedTask);

    const { mutate: updateTask } = useMutation(updateTaskAxios, {
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
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let parsedValue = name === 'priority' ? parseInt(value) : value;
        handleChange(name, parsedValue);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, newTask: INewTask) => {
        e.preventDefault();
        createTask(newTask);
        resetForm();
    };

    const handleSelectionChange = (itemIndexes: number[] | undefined) => {
        const filteredTasks = itemIndexes && data?.data.tasks.filter((task: ITask, index: number) => itemIndexes.includes(index));
        const mappedTasks = filteredTasks.map((task: ITask) => (task._id));
        setSelectedTaskIds(mappedTasks)
    };

    const handleDelete = () => {
        deleteTasks(selectedTaskIds);
    };

    const handleEditSave = (editedTask: ITask) => {
        updateTask(editedTask);
    };

    return (
        <main>
            <form style={{ maxWidth: '50vw', margin: '0 auto' }} onSubmit={(e) => handleSubmit(e, inputs)}>
                <TextField
                    id='assignee'
                    name='assignee'
                    label='Assignee'
                    type='string'
                    value={inputs.assignee}
                    onChange={(e) => handleInputChange(e)}
                    fullWidth
                    margin='normal'
                />
                <TextField
                    id='description'
                    name='description'
                    label='Description'
                    type='string'
                    value={inputs.description}
                    onChange={(e) => handleInputChange(e)}
                    fullWidth
                    margin='normal'
                />
                <TextField
                    id='priority'
                    name='priority'
                    label='Priority'
                    type='number'
                    value={inputs.priority}
                    onChange={(e) => handleInputChange(e)}
                    fullWidth
                    margin='normal'
                />
                <div style={{ width: 'fit-content', margin: '1rem 0 1rem auto' }}>
                    <Button style={{ marginRight: '1rem' }} type='button' onClick={resetForm} variant='contained' color="error">
                        Reset
                    </Button>
                    <Button type='submit' value='Submit' variant='contained' color="primary">
                        Submit
                    </Button>
                </div>
            </form>
            {isError && <h2>{error?.message}</h2>}
            {isLoading && <h2>Loading...</h2>}
            {!isError && !isLoading && (
                <>
                    {data?.data.tasks && (
                        <TasksTable
                            tasks={data?.data.tasks}
                            handleSelectionChange={handleSelectionChange}
                            handleDelete={handleDelete}
                            handleEditSave={handleEditSave}
                        />
                    )}
                </>
            )}
        </main>
    )
}

export default Tasks;
