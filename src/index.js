// index.js 
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');

// ReactDOM.hydrateRoot(container, 
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
    {/* <script>var process = { env: { NODE_ENV: 'development' } };</script> */}
  </React.StrictMode>
)

