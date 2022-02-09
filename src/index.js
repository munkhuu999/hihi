import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import burgerReducer from './redux/reducer/burgerReducer';
import orderReducer from './redux/reducer/orderReducer';
import sign_login_Reducer from './redux/reducer/sign_login_Reducer';


const loggerMiddleware = store => {
  return next => {
    return action => {
      console.log('action --->', action);
      console.log('before --->', store.getState());
      const result = next(action);
      console.log('result --->', store.getState());
      return result;
    }
  }
};
const reducer = combineReducers({
  burgerReducer: burgerReducer,
  orderReducer: orderReducer,
  sign_login_Reducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [loggerMiddleware, thunk]
const store = createStore(reducer, composeEnhancers(applyMiddleware(...middlewares)));
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
