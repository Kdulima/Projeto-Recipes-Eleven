import React from 'react';
import './App.css';
import { BsFillDice6Fill } from 'react-icons/bs';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import { MainProvider } from './components/MainProvider';

function App() {
  return (
    <MainProvider>
      <Routes />
      <div className="meals">
        <span className="logo">
          Insira um título aqui
          {' '}
          <BsFillDice6Fill />
          {' '}
        </span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
      </div>
    </MainProvider>
  );
}

export default App;
