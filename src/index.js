import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import BasicLayout from './resize.js';
import GitHubFeatures from './GitHubFeatures.js';
import Calendar from './Calendar.js';

import EditTest from './EditTest.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <div>
  {/* <BasicLayout /> */}
     {/* <GitHubFeatures username="YashCh31"/>  */}
    <Calendar/>

   {/*  <EditTest > </EditTest> */}
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
