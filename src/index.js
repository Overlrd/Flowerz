// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './static/styles.css'

const App = React.lazy(() => import('./components/App')); // Dynamically import your main App component

ReactDOM.render(
  <React.Suspense fallback={<div>Loading...</div>}>
    <App />
  </React.Suspense>,
  document.getElementById('root')
);
