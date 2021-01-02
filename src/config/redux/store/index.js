import { createStore } from 'redux'
import reducer from '../reducer'

// const store = createStore(reducers, compose(applyMiddleware(thunk)));
export const store = createStore(reducer);
