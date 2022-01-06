import React from 'react';
import { Route, Switch } from 'react-router-dom';
import List from './pages/List/index';
import Login from './pages/Login';
import DetailOrInProgressRecipe from './pages/DetailOrInProgressRecipe';
import Explore from './pages/Explore';
import ExploreRecipes from './pages/ExploreRecipes';
import Ingredients from './pages/Ingredients';
import ExploreFoodOrDrinks from './pages/ExploreFoodOrDrinks';
import Profile from './pages/Profile';
import DoneOrFavoriteRecipes from './pages/DoneOrFavoriteRecipes';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/comidas/:id/in-progress" component={ DetailOrInProgressRecipe } />
      <Route path="/bebidas/:id/in-progress" component={ DetailOrInProgressRecipe } />
      <Route exact path="/comidas/:id" component={ DetailOrInProgressRecipe } />
      <Route exact path="/bebidas/:id" component={ DetailOrInProgressRecipe } />
      <Route exact path="/comidas" component={ List } />
      <Route exact path="/bebidas" component={ List } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreRecipes } />
      <Route exact path="/explorar/bebidas" component={ ExploreRecipes } />
      <Route path="/explorar/comidas/ingredientes" component={ Ingredients } />
      <Route path="/explorar/bebidas/ingredientes" component={ Ingredients } />
      <Route path="/explorar/comidas/area" component={ ExploreFoodOrDrinks } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ DoneOrFavoriteRecipes } />
      <Route path="/receitas-favoritas" component={ DoneOrFavoriteRecipes } />
    </Switch>
  );
}
