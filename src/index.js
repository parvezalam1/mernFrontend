import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ContextProvider} from './contextApi/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
  <ContextProvider>

    <App />
  </ContextProvider>
  </React.StrictMode>
);


