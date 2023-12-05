'use client'

import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const Tasks = (): JSX.Element => {

    const getAllTasks = () => axios.get('http://localhost:8888/tasks/get/all');

    const { isLoading, data } = useQuery('getAllTasks', getAllTasks);

  return (
    <main>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <h2>Task count: {data?.data.tasks.length}</h2>
          {data?.data.tasks && data.data.tasks.map((task) => {
            const { _id: id, assignee, description, priority } = task;
            return (
              <>
                <ul>
                  <li>{id}</li>
                  <li>{assignee}</li>
                  <li>{description}</li>
                  <li>{priority}</li>
                </ul>
              </>
            )
          })}
        </div>
      )
      }
    </main>
  )
}

export default Tasks;
