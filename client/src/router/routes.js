import { createBrowserRouter } from 'react-router';
import { MainLayout } from '../layouts/MainLayout';
import { MainPage } from '../pages/MainPage/MainPage';
import { ErrorPage } from '../pages/ErrorPage/ErrorPage';
import { Table } from '../pages/Table/Table';

export const routes = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      { index: true, Component: MainPage },
      { path: '/auth', Component: MainPage },
      { path: '/register', Component: MainPage },
      { path: '/table', Component: Table },
      { path: '*', Component: ErrorPage },
    ],
  },
]);
