import React from 'react';
import ReactDOM from 'react-dom/client';
import { CounterContextProvider } from './contexts/CounterContext';
import './styles/global.css';
import { Home } from './templates/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CounterContextProvider>
      <Home />
    </CounterContextProvider>
  </React.StrictMode>,
);
