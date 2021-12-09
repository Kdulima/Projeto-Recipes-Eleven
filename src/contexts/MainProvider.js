import React, { useState, useEffect } from 'react';
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
  const [recipesType, setRecipesType] = useState('meals');
  const [recipesBy, setRecipesBy] = useState({ searchType: '', searchInput: '' }); // aqui dependeria de qual radio estaria marcado

  useEffect(() => {
    async function requestRecipes() {
      console.log(recipesBy);
      setIsFetching(true);
      let response;

      switch (recipesBy.searchType) {
      case 'ingredient':
        response = await getRecipesByIngredient(recipesBy.searchInput, recipesType);
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
        setRecipes(...recipes);
        setIsFetching(false);
        break;
      }
      console.log('fiz o fetch');
    }
    requestRecipes();
  }, [recipesBy]);

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
