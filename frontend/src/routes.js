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
import Landing from 'src/views/landing/Landing';

const routes = [
  { path: '/account', component: AccountView, layout: '/admin' },
  { path: '/users', component: CustomerListView, layout: '/admin' },
  { path: '/products', component: ProductListView, layout: '/admin' },
  { path: '/settings', component: SettingsView, layout: '/admin' },
  { path: '/error404', component: NotFoundView, layout: '/admin' },
  { path: '', component: DashboardView, layout: '/admin' },
  { path: '/', component: LoginView, layout: '/auth' }
];

export default routes;
