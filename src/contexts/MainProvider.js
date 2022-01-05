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
  const [isFetching, setIsFetching] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [canTryRedirect, setCanTryRedirect] = useState(true);
  const [categoryToFilter, setCategoryToFilter] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState({});
  //  recipesType sempre 'meals' ou 'drinks'
  const [recipesType, setRecipesType] = useState('meals');
  const [idType, setIdType] = useState('idMeal');
  const [recipesBy, setRecipesBy] = useState({
    searchInput: '', searchType: 'name',
  });

  useEffect(() => setIsMounted(true), []);

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

  useEffect(() => {
    if (!isMounted) {
      const doneList = localStorage.getItem('doneRecipes');
      const favoriteList = localStorage.getItem('favoriteRecipes');
      const inProgressList = localStorage.getItem('inProgressRecipes');

      setDoneRecipes(JSON.parse(doneList) || []);
      setFavoriteRecipes(JSON.parse(favoriteList) || []);
      setInProgressRecipes(JSON.parse(inProgressList) || {});
    }
  }, [isMounted]);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

  function setInProgressRecipe(id, progress = []) {
    const type = recipesType === 'drinks' ? 'cocktails' : 'meals';
    setInProgressRecipes((prevState) => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [id]: progress,
      },
    }));
  }

  function removeInProgressRecipe(id) {
    const type = recipesType === 'drinks' ? 'cocktails' : 'meals';
    setInProgressRecipes((prevState) => {
      delete prevState[type][id];
      return { ...prevState };
    });
  }

  function handleInFavorites(recipeDetail) {
    setFavoriteRecipes((prevState) => {
      if (prevState.some(({ id }) => id === recipeDetail.id)) {
        return prevState.filter(({ id }) => id !== recipeDetail.id);
      }
      return [...prevState, recipeDetail];
    });
  }

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  return (
    <mainContext.Provider
      value={ {
        isFetching,
        recipes,
        isMounted,
        canTryRedirect,
        doneRecipes,
        recipesType,
        setRecipesType,
        idType,
        setIdType,
        recipesBy,
        setRecipesBy,
        categoryToFilter,
        setCategoryToFilter,
        favoriteRecipes,
        setFavoriteRecipes,
        handleInFavorites,
        inProgressRecipes,
        setInProgressRecipe,
        removeInProgressRecipe,
      } }
    >
      {children}
    </mainContext.Provider>
  );
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
