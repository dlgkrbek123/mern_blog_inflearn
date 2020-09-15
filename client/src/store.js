import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddlware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddlware } from 'connected-react-router';

import createRootReducer from './redux/reducers';
import rootSaga from './redux/sagas';

export const history = createBrowserHistory();
const sagaMiddlware = createSagaMiddlware();
const middlewares = [sagaMiddlware, routerMiddlware(history)];

const reducer = createRootReducer(history);
const initialState = {};
const composeEnhancer =
  process.env.NODE_ENV === 'production' ? compose : composeWithDevTools;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(...middlewares))
);
sagaMiddlware.run(rootSaga);

export default store;
