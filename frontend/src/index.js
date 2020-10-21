import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store, { history } from './store';

ReactDOM.render(
  <Provider store={store}>
  <ConnectedRouter history={history}>
  {/* <BrowserRouter> */}
    <App />
  {/* </BrowserRouter> */}
   </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
