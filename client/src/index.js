import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import './index.scss'

import { CssBaseline } from '@mui/material';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <CssBaseline>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </CssBaseline>
  </React.StrictMode>

);
