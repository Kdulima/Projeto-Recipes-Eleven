import React from 'react';
import { Route, Switch } from 'react-router-dom';
import List from './pages/List/index';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';
import DrinkDetails from './pages/DrinkDetails';
import FoodInProgress from './pages/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import Ingredients from './pages/Ingredients';
import ExploreArea from './pages/ExploreArea';
import Profile from './pages/Profile';
import RecipesMade from './pages/RecipesMade';
import Favorites from './pages/Favorites';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ List } />
      <Route exact path="/bebidas" component={ List } />
      <Route path="/comidas/:id" component={ RecipeDetails } />
      <Route path="/bebidas/:id" component={ DrinkDetails } />
      <Route path="/comidas/:id/in-progress" component={ FoodInProgress } />
      <Route path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
      <Route exact path="/explorar" component={ Explore } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route path="/explorar/comidas/ingredientes" component={ Ingredients } />
      <Route path="/explorar/bebidas/ingredientes" component={ Ingredients } />
      <Route path="/explorar/comidas/area" component={ ExploreArea } />
      <Route path="/perfil" component={ Profile } />
      <Route path="/receitas-feitas" component={ RecipesMade } />
      <Route path="/receitas-favoritas" component={ Favorites } />
    </Switch>
  );
}
