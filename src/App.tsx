import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login/Login'
import Routes from './routes/Routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
      
  );
}

export default App;
