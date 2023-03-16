import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss'

import { CssBaseline } from '@mui/material';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <CssBaseline>
        <App />
    </CssBaseline>
  </React.StrictMode>

);
