import React from 'react';
import { Router } from 'react-router-dom';
import history from './utils/History'
import { AuthProvider } from './context/AuthContext';
import Routes from './routes/Routes';

function App() {
  return (
    <Router history={history}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
      
  );
}

export default App;
