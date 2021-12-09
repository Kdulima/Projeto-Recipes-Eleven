import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import List from './pages/List/index';
import Login from './pages/Login';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ List } />
        <Route path="/bebidas" component={ List } />
      </Switch>
    </BrowserRouter>
  );
}
