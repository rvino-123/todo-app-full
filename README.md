# (Yet Another) ToDo App with React

## About

This is my first project in React, it is a ToDo app where you can split your personal tasks and professional tasks into different boards.

- You can view your Personal Board or Professional Board together or seperately.
- You can create and manage custom categories for each board and filter tasks by category.
- You are authenticated via and password.
- your data is stored in the firebase Firestore for quick storage and retreival.

**Please do not enter any sensitive data, you are perfectly fine to use fake details if you wish to try the application**

## Live Demo

- Website: https://todo-app-full.vercel.app/
- Video Demo: https://youtu.be/EoCbWN7iC5Q

## Install and Run Project

- To install to your local machine, run `git clone https://github.com/rvino-123/todo-app-full.git`
- To run locally, run `npm start`

## Stack

- Front-end: React
- Server: Google Firebase for storing data and authentication

## Design Decisions

- React Functional Components: using basic hooks such as useEffect and useState and wrote a custom hook for authentication with FireBase.
- Styled Components: styling components with javascript, limiting the use of CSS as much as possible.
- Context: manages state of the application to avoid drilling down props through many components. Use of Reducer to update/clear state.
- React-Modal: to handle modals for editing/creating.
- React-Toastify: displays messages to the user (error/info or success).
- React icons: for easy styling and selection of icons inside the app.
- uuid: creates unique identifiers for entities inside the application

## What I learned from this project

- This project helped me appreciate the React component lifestyle. I was having issues with components rendering before context was loaded and received errors. Using the useEffect hook, async/await operations with promises I was able to delay the rendering of components dependent on data until data was loaded in the context.
- Reusability with styled components. I originally had done this project with a large css file and tons of repeated code with respect to components. Styled components taught me how to organise styles and component functions, and how to think in terms of reusability.

## Future additions

- Mobile version: I'd like to be make this tool responsive to mobile devices.
- Redux: I'd like to manage state globally with redux, retriving state via the component leaves.
- Performance Optimization (caching): When I update or create a new task, I need to send a get request to firebase to get all the tasks again. I'd like to store the tasks in the browser, so that if I add/update a task it will only notify firebase via POST and appends/updates task inside the browser. This will sigingicantly reduce firestore usage and allow potentially more users to use the application.
- TypeScript: Currently learning TypeScript, I'd like to comeback to this project and completely rewrite it in typescript.
