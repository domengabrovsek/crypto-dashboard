import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// apply bootstrap class to <html> element
document.documentElement.className = 'h-100';

// apply bootstrap class to <body> element
document.body.className = 'bg-dark text-light';