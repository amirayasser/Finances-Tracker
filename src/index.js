import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserInfoProvider } from './components/context/InfoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserInfoProvider>
      <App />
    </UserInfoProvider>
  </React.StrictMode>
);

