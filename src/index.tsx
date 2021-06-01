import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { App } from './components/app';
import ReduxThunk from 'redux-thunk';
import "./styles/styles.css";
import { Provider } from 'react-redux';
import reducers from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';


/* Initialize Middleware */

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
     <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
 
  document.getElementById('root')
);


