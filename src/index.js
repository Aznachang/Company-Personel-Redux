import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

/**** IMPORT REDUCERS ****/
import companyListReducer from './reducers/companyListReducer.js';
import importCompaniesReducer from './reducers/importCompaniesReducer.js';
import companyReducer from './reducers/companyReducer.js';
import employeesReducer from './reducers/employeesReducer.js';
import personReducer from './reducers/personReducer.js';

/** CSS **/
// import './index.css';

/** COMPONENTS **/
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const loggerMiddleware = createLogger();
const root = document.getElementById('root');

// COMBINE ALL REDUCERS
const rootReducer = combineReducers({
  companyList: companyListReducer,
  importCompanies: importCompaniesReducer,
  companyDetail: companyReducer,
  employees: employeesReducer,
  person: personReducer  
});

// CREATE STORE AND APPLY MIDDLEWARE
const store = createStore(rootReducer,
  applyMiddleware(thunk, loggerMiddleware)
);

// CREATE PROVIDER - GIVE CONTAINERS ACCESS TO REDUCERS/STORE
const provide = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)

render(provide, root);
registerServiceWorker();