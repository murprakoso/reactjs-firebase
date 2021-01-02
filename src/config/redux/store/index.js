import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducer'

// const store = createStore(reducers, compose(applyMiddleware(thunk)));
export const store = createStore(reducer, applyMiddleware(thunk));
