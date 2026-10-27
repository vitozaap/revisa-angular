import type { Routes } from '@angular/router';
import { Login } from './(auth)/login/login';
import { Register } from './(auth)/register/register';
import { History } from './(user)/history/history';
import { Report } from './(user)/history/report/report';
import { Home } from './(user)/home/home';
import { NewAnalysis } from './(user)/new-analysis/new-analysis';
import { ResumePage } from './(user)/resume/resume';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'history',
    component: History,
  },
  {
    path: 'history/:id',
    component: Report,
  },
  {
    path: 'new-analysis',
    component: NewAnalysis,
  },
  {
    path: 'resume',
    component: ResumePage,
  },
];
