# Task Manager Frontend

## Description

The frontend for a task management web application, connected to a [task-manager-backend](https://github.com/JamesVickers/task-manager-backend) REST API.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/download)
- [Axios](https://www.npmjs.com/package/axios)
- [React Query](https://www.npmjs.com/package/react-query).
- [mui-datatables](https://www.npmjs.com/package/mui-datatables)
- [ESLint](https://eslint.org/)

## Highlights

- The project has two pages which both display all tasks; the first page calls the axios get request with a useEffect hook, the second page makes the same get request call using [React Query](https://www.npmjs.com/package/react-query).
    - This duplication is intentional, to highlight the benefits of using cached data from React Query
- All git commits follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) guidelines
- The following actions are available to the user:
    - Create tasks
    - View all tasks, with filtering, sorting, searching, etc.
    - Edit tasks
    - Delete task(s)

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/) (Version v20.10.0 or later).

- **npm**: npm (Node Package Manager) comes bundled with Node.js.

- **Git**: Git is required for version control. Install it from [git-scm.com](https://git-scm.com/downloads).

## Installation

Follow these steps to set up the project:

1. Clone this repository: 
    ```bash 
    git clone https://github.com/JamesVickers/task-manager-frontend`
2. Navigate to the project directory, for example: `cd task-manager-frontend`
3. Install dependencies using the following command:
    ```bash 
    npm install

## Setup

You must have the corresponing REST API project running locally. For instructions on how to do this, see the README.md file for the corresponding [task-manager-backend](https://github.com/JamesVickers/task-manager-backend/blob/main/README.md) REST API. The task-manager-backend README file will also explain how to set up a local MongoDB instance running.

Once the local MongoDB and REST API backend are running, you are ready to connect the frontend by running the code in this repo locally.

## Running the project locally

For development, open a new terminal window and run the project using the following command:
    ```bash 
    npm run dev.

Visit [ttp://localhost:3000/](http://localhost:3000/) to view the application. 

## Available Scripts

In the project directory, you can run the following scripts:

- **Development Mode**: 
  ```bash
  npm run dev

- **Build**: 
  ```bash
  npm run build

- **Build**: 
  ```bash
  npm run start
  
- **ESLint**: 
  ```bash
  npm run lint

## Dependencies
- [@emotion/react](https://github.com/emotion-js/emotion): ^11.11.1
- [@emotion/styled](https://github.com/emotion-js/emotion): ^11.11.0
- [@mui/icons-material](https://mui.com/): ^5.14.19
- [@mui/material](https://mui.com/): ^5.14.20
- [axios](https://github.com/axios/axios): ^1.6.2
- [mui-datatables](https://github.com/gregnb/mui-datatables): ^4.3.0
- [next](https://nextjs.org/): 14.0.3
- [react](https://reactjs.org/): ^18
- [react-dom](https://reactjs.org/): ^18
- [react-query](https://react-query.tanstack.com/): ^3.39.3

## Dev Dependencies
- [@types/mui-datatables](https://github.com/gregnb/mui-datatables): ^4.3.11
- [@types/node](https://github.com/DefinitelyTyped/DefinitelyTyped): ^20
- [@types/react](https://github.com/DefinitelyTyped/DefinitelyTyped): ^18
- [@types/react-dom](https://github.com/DefinitelyTyped/DefinitelyTyped): ^18
- [eslint](https://eslint.org/): ^8
- [eslint-config-next](https://github.com/vercel/eslint-config-next): 14.0.3
- [typescript](https://www.typescriptlang.org/): ^5
