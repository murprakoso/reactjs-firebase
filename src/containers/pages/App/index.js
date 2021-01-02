import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from '../Dashboard';
import Login from '../Login';
import Register from '../Register';
import { createStore } from 'redux';
import { Provider } from 'react-redux';


const initialState = {
  popup: false,
  isLogin: false
}

const reducer = (state = initialState, action) => {
  if (action.type === 'CHANGE_POPUP') {
    return {
      ...state,
      popop: action.value
    }
  }
  if (action.type === 'CHANGE_ISLOGIN') {
    return {
      ...state,
      isLogin: action.value
    }
  }

  return state;
}

// const store = createStore(reducers, compose(applyMiddleware(thunk)));
const store = createStore(reducer);


/** Start */
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Route path="/" exact component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </Router>
    </Provider>
  )
}

export default App
