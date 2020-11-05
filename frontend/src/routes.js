import React from 'react';
// import { Navigate } from 'react-router-dom';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import SourceListView from 'src/views/source/index';
import SourceFormView from 'src/views/source/SourceFormView';
import EntryListView from 'src/views/entry/index';
import EntryFormView from 'src/views/entry/EntryFormView';
import Landing from 'src/views/landing/Landing';

const routes = [
  // Users
  { path: '/account', component: AccountView, layout: '/admin' },
  { path: '/users', component: CustomerListView, layout: '/admin' },
  { path: '/products', component: ProductListView, layout: '/admin' },

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
  { path: '/', component: LoginView, layout: '/auth' }
];

export default routes;
