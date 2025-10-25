import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'; // Comment out or remove if unused

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Comment out or remove this line if not using web-vitals
reportWebVitals();