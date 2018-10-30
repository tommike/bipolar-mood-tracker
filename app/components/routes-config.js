import LoginPage from './login-page';
import DashboardPage from './dashboard-page';
import MoodTrackerPage from './mood-tracker-page';
import ReportsPage from './reports-page';
import AboutPage from './about-page';
import SignUpPage from './sign-up-page';
import AccountPage from './account-page';
import PasswordForgetPage from './password-forget-page';
import DefaultLayout from './default-layout';

export const routes = [
  {
    path: '/',
    component: LoginPage,
    layout: DefaultLayout,
    exact: true,
  },
  {
    path: '/dashboard',
    component: DashboardPage,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    path: '/mood-tracker',
    component: MoodTrackerPage,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    path: '/reports',
    component: ReportsPage,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    path: '/about',
    component: AboutPage,
    layout: DefaultLayout,
  },
  {
    path: '/sign-up',
    component: SignUpPage,
    layout: DefaultLayout,
  },
  {
    path: '/account',
    component: AccountPage,
    layout: DefaultLayout,
    isPrivate: true,
  },
  {
    path: '/password-forget',
    component: PasswordForgetPage,
    layout: DefaultLayout,
  },
];
