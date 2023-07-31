import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { router } from './router/Router';
import './scss/main.scss';

const root = document.getElementById('root');

createRoot(root).render(
  <RouterProvider router={router}/>
)
