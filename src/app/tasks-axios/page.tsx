'use client'

import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ITask } from '../types/interfaces';

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
        <div>
          {tasks && <h2>Task count: {tasks.length}</h2>}
          {tasks?.length && tasks.map((task: ITask) => {
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

export default TasksAxios;
