'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8888/tasks/get/all')
      .then((res) => {
        console.log('res: ', res)
        const { tasks: axiosTasks } = res.data
        setTasks(axiosTasks);
        setIsLoading(false);
      })
  }, [])

  return (
    <main>
      <h1>
        Task Manager Frontend
      </h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <h2>Task count: {tasks.length}</h2>
          {tasks && tasks.map((task) => {
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

export default Home;
