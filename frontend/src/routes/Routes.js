import { lazy } from 'react';

const routes = [
  {
    path: 'home',
    component: lazy(() => import('components/Home')),
    exact: true
  },
  {
    path: 'login',
    component: lazy(() => import('components/Login')),
    exact: true
  }, 
  {
    path: 'profile-page',
    component: lazy(() => import('components/ProfilePage')),
    exact: true
  }, 
  {
    path: 'signup',
    component: lazy(() => import('components/Signup')),
    exact: true
  }
];

export default routes;