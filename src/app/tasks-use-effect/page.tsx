'use client'

import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { ITask } from '../types/interfaces';
import { baseUrl } from '@/constants';
import TasksTable from '../components/tables/TaskTable';

const Tasks_useEffect_For_Comparison_Only = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<ITask[]>();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get(`${baseUrl}/tasks/get/all`)
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
            // Ignoring TS props suggestion here because this file is for demo purposes ONLY
            // @ts-ignore: Unreachable code error
            <TasksTable tasks={tasks} />
          )}
        </>
      )}
    </main>
  )
}

export default Tasks_useEffect_For_Comparison_Only;
