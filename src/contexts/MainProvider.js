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
  const [categoryToFilter, setCategoryToFilter] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [recipes, setRecipes] = useState([]);

  // aqui dependeria de qual radio estaria marcado
  const [recipesBy, setRecipesBy] = useState({ searchType: 'name', searchInput: '' });

  //  recipesType sempre 'meals' ou 'drinks'
  const [recipesType, setRecipesType] = useState('');

  async function requestRecipes() {
    setIsFetching(true);
    let response;
    switch (recipesBy.searchType) {
    case 'ingredient':
      response = await getRecipesByIngredient(recipesBy.searchInput, recipesType);
      // Não tirei o setRecipes pois não sabia se iria quebrar outro lugar, mas na search bar eu usei o retorno dessa função e não o estado do contexto
      setRecipes(response);
      setIsFetching(false);
      break;
    case 'name':
      response = await getRecipesByName(recipesBy.searchInput, recipesType);
      setRecipes(response);
      setIsFetching(false);
      break;
    case 'firstLetter':
      response = await getRecipesByFirstLetter(recipesBy.searchInput, recipesType);
      setRecipes(response);
      setIsFetching(false);
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
        categoryToFilter,
        setCategoryToFilter,
      } }
    >
      {children}
    </mainContext.Provider>
  );
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
