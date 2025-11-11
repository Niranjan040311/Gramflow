import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Viewstory from './viewstory.jsx'


const router=createBrowserRouter(
  [

    {
      path:'/',
      element:<App/>
    },
    {
      path:'/story/:id',
      element:<Viewstory/>
    }
  ]
)
createRoot(document.getElementById('root')).render(
<RouterProvider router={router}/>
)

