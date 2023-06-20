import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './routes/Root';
import './Index.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Homepage from './components/Homepage';
import Login from './components/Login';
import Routines from './components/Routines';
import MyRoutines from './components/MyRoutines';
import Activities from './components/Activities';
import Routine from './components/Routine';

const router = createBrowserRouter([
  {
    path: "/",
    element:  <Root />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/routines",
        element: <Routines />,
      },
      {
        path: "/routines/:routineId",
        element: <Routine />,
      },
      {
        path: "/myroutines",
        element: <MyRoutines />,
      },
      {
        path: "/activities",
        element: <Activities />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
