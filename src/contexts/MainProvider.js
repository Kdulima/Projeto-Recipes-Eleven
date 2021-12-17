import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import mainContext from './mainContext';
import {
  getRecipesByFirstLetter,
  getRecipesByIngredient,
  getRecipesByName,
  getRecipesByCategory,
} from '../services/recipesAPI';

export default function MainProvider({ children }) {
  const [categoryToFilter, setCategoryToFilter] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [canTryRedirect, setCanTryRedirect] = useState(true);

  //  recipesType sempre 'meals' ou 'drinks'
  const [recipesType, setRecipesType] = useState('meals');
  const [recipesBy, setRecipesBy] = useState({
    searchInput: '', searchType: 'name',
  });

  function handleResponse(response) {
    if (response !== null) {
      setRecipes(response);
    } else {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    setIsFetching(false);
    setCanTryRedirect(true);
  }

  useEffect(() => {
    async function requestRecipes() {
      const { searchInput, searchType } = recipesBy;
      setIsFetching(true);
      let response;
      switch (searchType) {
      case 'ingredient':
        response = await getRecipesByIngredient(searchInput, recipesType);
        handleResponse(response);
        break;
      case 'name':
        response = await getRecipesByName(searchInput, recipesType);
        handleResponse(response);
        break;
      case 'firstLetter':
        response = await getRecipesByFirstLetter(searchInput, recipesType);
        handleResponse(response);
        break;
      default:
        setIsFetching(false);
        break;
      }
    }

    if (isMounted) {
      requestRecipes();
    }
  }, [recipesType, recipesBy, isMounted]);

  useEffect(() => {
    async function requestRecipesByCategory() {
      const response = await getRecipesByCategory(categoryToFilter, recipesType);
      if (response) {
        setCanTryRedirect(false);
        setRecipes(response);
      }
    }
    if (isMounted) {
      if (categoryToFilter !== 'All') {
        requestRecipesByCategory();
      } else {
        setRecipesBy((prevRecipesBy) => ({ ...prevRecipesBy }));
      }
    }
  }, [categoryToFilter, recipesType, isMounted]);

  return (
    <mainContext.Provider
      value={ {
        recipesType,
        setRecipesType,
        recipesBy,
        setRecipesBy,
        isFetching,
        recipes,
        categoryToFilter,
        setCategoryToFilter,
        canTryRedirect,
        setIsMounted,
      } }
    >
      {children}
    </mainContext.Provider>
  );
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
