import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import RestrictedRoutes from './components/RestrictedRoutes';

function App() {
  return (
    <div className="container">
      <Router>
        <RestrictedRoutes />
      </Router>
    </div>
  );
}

export default App;
