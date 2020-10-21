import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
// import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/views/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { Route, Switch } from 'react-router';
import Landing from './views/landing/Landing';
import MainLayout from './views/layouts/MainLayout/index';
import DashboardLayout from './views/layouts/DashboardLayout/index';
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Route exact path="/" render={() => <Landing />} />
      <Route path="/auth" render={() => <MainLayout />} />
      <Route path="/admin" render={props => <DashboardLayout {...props} />} />
      <Route render={() => <div>Miss</div>} />
      <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
    </ThemeProvider>
  );
};

export default App;
