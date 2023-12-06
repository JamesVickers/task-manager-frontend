'use client'

import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { ITask } from '../types/interfaces';
import TasksTable from '../components/tables/TaskTable';

const TasksAxios = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<ITask[]>();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8888/tasks/get/all')
      .then((res) => {
        const { tasks: axiosTasks } = res.data
        setTasks(axiosTasks);
        setIsLoading(false);
      })
      .catch((err: AxiosError) => {
        const { message: errorMessage } = err
        setErrorMessage(errorMessage);
        setIsLoading(false);
      })
  }, [])

  return (
    <main>
      {errorMessage && <h2>{errorMessage}</h2>}
      {isLoading && <h2>Loading...</h2>}
      {!errorMessage && !isLoading && (
        <>
          {tasks && (
            <TasksTable tasks={tasks} />
          )}
        </>
      )}
    </main>
  )
}

export default TasksAxios;
