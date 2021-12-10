import React, { useState } from 'react';
import PropTypes from 'prop-types';
import mainContext from './mainContext';
import {
  getRecipesByFirstLetter,
  getRecipesByIngredient,
  getRecipesByName,
} from '../services/recipesAPI';

export default function MainProvider({ children }) {
  const [pageName, setPageName] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [recipesType, setRecipesType] = useState('');
  const [recipesBy, setRecipesBy] = useState({ searchType: '', searchInput: '' }); // aqui dependeria de qual radio estaria marcado

  async function requestRecipes() {
    console.log('opa');
    setIsFetching(true);
    let response;
    switch (recipesBy.searchType) {
    case 'ingredient':
      response = await getRecipesByIngredient(recipesBy.searchInput, recipesType);
      // Não tirei o setRecipes pois não sabia se iria quebrar outro lugar, mas na search bar eu usei o retorno dessa função e não o estado do contexto
      setRecipes(response);
      setIsFetching(false);
      console.log('Fetch ingredientes');
      break;
    case 'name':
      response = await getRecipesByName(recipesBy.searchInput, recipesType);
      setRecipes(response);
      setIsFetching(false);
      console.log('Fetch name');
      break;
    case 'firstLetter':
      response = await getRecipesByFirstLetter(recipesBy.searchInput, recipesType);
      setRecipes(response);
      setIsFetching(false);
      console.log('Fetch primeira');
      break;
    default:
      setIsFetching(false);
      break;
    }
  }

  return (
    <mainContext.Provider
      value={ {
        pageName,
        setPageName,
        recipesType,
        setRecipesType,
        recipesBy,
        setRecipesBy,
        requestRecipes,
        isFetching,
        recipes,
      } }
    >
      {children}
    </mainContext.Provider>
  );
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
