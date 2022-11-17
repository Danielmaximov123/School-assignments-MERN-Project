import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Router
import { BrowserRouter } from 'react-router-dom';

// Redux
import { applyMiddleware , createStore , combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";
import { Provider } from 'react-redux';
import authReduces from './redux/reducer/authReducer';
import usersReduces from './redux/reducer/usersReducer';
import variousReduces from './redux/reducer/variousReducer';
import subjectsReduces from './redux/reducer/subjectsReducer';
import missionReduces from './redux/reducer/missionsReducer';

const rootReducer = combineReducers({
   auth : authReduces,
   users : usersReduces,
   various : variousReduces,
   subjects : subjectsReduces,
   missions : missionReduces
})

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const appStore = createStore(rootReducer,composedEnhancer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={appStore}>
   <BrowserRouter>
   <div dir="rtl">
     <App />
   </div>
   </BrowserRouter>
   </Provider>
);
