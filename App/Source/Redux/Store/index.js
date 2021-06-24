import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './AppReducers';
import logger from 'redux-logger';

/**
 * Create a store with thunk middleware. And add reducers to it.
 */
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default store;
