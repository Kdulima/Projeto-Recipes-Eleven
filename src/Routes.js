import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import WithHeader from './components/WithHeader';
import WithoutHeader from './components/WithoutHeader';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ WithoutHeader } />
        <Route path="/comidas" component={ WithHeader } />
        <Route path="/bebidas" component={ WithHeader } />
        <Route path="/comidas/:id-da-receita" component={ WithHeader } />
        <Route path="/bebidas/:id-da-bebida" component={ WithHeader } />
        <Route path="/comidas/{id-da-receita}/in-progress" component={ WithHeader } />
        <Route path="/bebidas/{id-da-receita}/in-progress" component={ WithHeader } />
        <Route path="/explorar" component={ WithHeader } />
        <Route path="/explorar/comidas" component={ WithHeader } />
        <Route path="/explorar/bebidas" component={ WithHeader } />
        <Route path="/explorar/comidas/ingredientes" component={ WithHeader } />
        <Route path="/explorar/bebidas/ingredientes" component={ WithHeader } />
        <Route path="/explorar/comidas/area" component={ WithHeader } />
        <Route path="/perfil" component={ WithHeader } />
        <Route path="/receitas-feitas" component={ WithHeader } />
        <Route path="/receitas-favoritas" component={ WithHeader } />
      </Switch>
    </BrowserRouter>
  );
}
