import allReducers from './reducers'; 
import { createStore } from 'redux';
const redux = require('redux');
const redux_logger = require('redux-logger');
const applyMiddleware = redux.applyMiddleware;
const logger = redux_logger.createLogger();
const store = createStore(
  allReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.subscribe(() => {
  console.log(store.getState());
});

export default store;
