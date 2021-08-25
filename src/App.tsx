import React from 'react';
import { Router } from 'react-router-dom';
import history from './utils/History'
import './App.css'
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login/Login'
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
