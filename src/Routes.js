import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import List from './pages/List/List';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgres';
import Explore from './pages/Explore';
import ExploreRecipes from './pages/ExploreRecipes';
import Ingredients from './pages/Ingredients';
import ExploreArea from './pages/ExploreArea';
import Profile from './pages/Profile';
import RecipesMade from './pages/RecipesMade';
import Favorites from './pages/Favorites';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ List } />
        <Route exact path="/bebidas" component={ List } />
        <Route path="/comidas/:id" component={ RecipeDetails } />
        <Route path="/bebidas/:id" component={ RecipeDetails } />
        <Route path="/comidas/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/comidas" component={ ExploreRecipes } />
        <Route exact path="/explorar/bebidas" component={ ExploreRecipes } />
        <Route path="/explorar/comidas/ingredientes" component={ Ingredients } />
        <Route path="/explorar/bebidas/ingredientes" component={ Ingredients } />
        <Route path="/explorar/comidas/area" component={ ExploreArea } />
        <Route path="/perfil" component={ Profile } />
        <Route path="/receitas-feitas" component={ RecipesMade } />
        <Route path="/receitas-favoritas" component={ Favorites } />
      </Switch>
    </BrowserRouter>
  );
}
