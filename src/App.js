import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import MainProvider from './components/MainProvider';

function App() {
  return (
    <MainProvider>
      <Routes />
    </MainProvider>
  );
}

export default App;
