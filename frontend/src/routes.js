import React from 'react';
// import { Navigate } from 'react-router-dom';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import ReportSentiment from 'src/views/reports/SentimentView/ReportSentiment';
import LoginView from 'src/views/auth/LoginView';
import ForgotPassword from 'src/views/auth/ForgotPassword';
import PasswordResetSuccess from 'src/views/auth/PasswordResetSuccess';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import UserListView from 'src/views/user/index';
import UserFormView from 'src/views/user/UserFormView';
import SourceListView from 'src/views/source/index';
import SourceFormView from 'src/views/source/SourceFormView';
import ReportSentimentListView from 'src/views/reports/SentimentView/index';
import ReportFormView from 'src/views/reports/SentimentView/ReportFormView';
import ReportAdvancedListView from 'src/views/reports/AdvancedView/index';
import ReportAdvancedFormView from 'src/views/reports/AdvancedView/ReportFormView';
import EntryListView from 'src/views/entry/index';
import EntryFormView from 'src/views/entry/EntryFormView';
import Landing from 'src/views/landing/Landing';

const routes = [
  // Users
  { path: '/users/edit/:id', component: UserFormView, layout: '/admin' },
  { path: '/users/add', component: UserFormView, layout: '/admin' },
  { path: '/users/:pagen', component: UserListView, layout: '/admin' },
  { path: '/account', component: AccountView, layout: '/admin' },

  // Products
  { path: '/products', component: ProductListView, layout: '/admin' },

  // Reports Basic
  { path: '/report-basic/edit/:id', component: ReportFormView, layout: '/admin' },
  { path: '/report-basic/add', component: ReportFormView, layout: '/admin' },
  { path: '/report-basic/:pagen', component: ReportSentimentListView, layout: '/admin' },

  // Reports Advanced
  { path: '/report-advanced/edit/:id', component: ReportAdvancedFormView, layout: '/admin' },
  { path: '/report-advanced/add', component: ReportAdvancedFormView, layout: '/admin' },
  { path: '/report-advanced/:pagen', component: ReportAdvancedListView, layout: '/admin' },

  // Report View
  { path: '/report-sentiment/:id', component: ReportSentiment, layout: '/admin' },
  { path: '/report-sentiment/:id', component: ReportSentiment, layout: '/auth' },

  // Source
  { path: '/sources/edit/:id', component: SourceFormView, layout: '/admin' },
  { path: '/sources/add', component: SourceFormView, layout: '/admin' },
  { path: '/sources/:pagen', component: SourceListView, layout: '/admin' },

  // Entry
  { path: '/entries/edit/:id', component: EntryFormView, layout: '/admin' },
  { path: '/entries/add', component: EntryFormView, layout: '/admin' },
  { path: '/entries/:pagen', component: EntryListView, layout: '/admin' },

  // Settings
  { path: '/settings', component: SettingsView, layout: '/admin' },
  { path: '/error404', component: NotFoundView, layout: '/admin' },
  { path: '', component: DashboardView, layout: '/admin' },

  // Auth
  { path: '/login', component: LoginView, layout: '/auth' },
  { path: '/forgot-password', component: ForgotPassword, layout: '/auth' },
  { path: '/password-reset-success', component: PasswordResetSuccess, layout: '/auth' }
];

export default routes;
