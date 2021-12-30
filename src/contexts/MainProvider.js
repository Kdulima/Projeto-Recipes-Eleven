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
  const [inProgressRecipes, setInProgressRecipes] = useState({});
  const [doneRecipes, setDoneRecipes] = useState([]);
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
      const inProgressList = localStorage.getItem('inProgressRecipes');
      const doneList = localStorage.getItem('doneRecipes');
      setInProgressRecipes(JSON.parse(inProgressList) || {});
      setDoneRecipes(JSON.parse(doneList) || []);
    }
  }, [isMounted]);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

  function addInProgressRecipe(id, type) {
    setInProgressRecipes((prevState) => ({
      ...prevState,
      [type]: {
        ...prevState[type],
        [id]: [],
      },
    }));
  }

  return (
    <mainContext.Provider
      value={ {
        isFetching,
        recipes,
        isMounted,
        canTryRedirect,

        recipesType,
        setRecipesType,
        idType,
        setIdType,
        recipesBy,
        setRecipesBy,
        categoryToFilter,
        setCategoryToFilter,
        inProgressRecipes,
        addInProgressRecipe,
        doneRecipes,
      } }
    >
      {children}
    </mainContext.Provider>
  );
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
