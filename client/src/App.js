import React from 'react';
import { Provider } from 'react-redux';
import store, { history } from './store';
import { ConnectedRouter } from 'connected-react-router';
import MyRouter from './routes/Router';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/custom.scss';

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MyRouter />
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
