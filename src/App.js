import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import MainProvider from './contexts/MainProvider';

function App() {
  return (
    <MainProvider>
      <Routes />
    </MainProvider>
  );
}

export default App;
