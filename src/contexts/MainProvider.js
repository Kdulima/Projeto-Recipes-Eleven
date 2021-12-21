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
  const [idsInProgress, setIdsInProgress] = useState([]);
  const [idsDone, setIdsDone] = useState([]);
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
      const inProgressList = localStorage.getItem('idsInProgress');
      const doneList = localStorage.getItem('idsDOne');
      setIdsInProgress(JSON.parse(inProgressList) || []);
      setIdsDone(JSON.parse(doneList) || []);
    }
  }, [isMounted]);

  useEffect(() => {
    localStorage.setItem('idsInProgress', JSON.stringify(idsInProgress));
  }, [idsInProgress]);

  function addInProgress(id) {
    setIdsInProgress((prevState) => {
      if (prevState.includes(id)) {
        return prevState;
      }

      return [...prevState, id];
    });
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
        idsInProgress,
        addInProgress,
        idsDone,
      } }
    >
      {children}
    </mainContext.Provider>
  );
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
