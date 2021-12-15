import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import mainContext from './mainContext';
import {
  getRecipesByFirstLetter,
  getRecipesByIngredient,
  getRecipesByName,
} from '../services/recipesAPI';

export default function MainProvider({ children }) {
  const [categoryToFilter, setCategoryToFilter] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  //  recipesType sempre 'meals' ou 'drinks'
  const [recipesType, setRecipesType] = useState('meals');
  const [recipesBy, setRecipesBy] = useState({
    searchInput: '', searchType: 'name',
  });

  useEffect(() => {
    async function requestRecipes() {
      const { searchInput, searchType } = recipesBy;
      setIsFetching(true);
      let response;
      switch (searchType) {
      case 'ingredient':
        response = await getRecipesByIngredient(searchInput, recipesType);
        if (response !== null) {
          setRecipes(response);
          setIsFetching(false);
        } else {
          setShowAlert(true);
          setIsFetching(false);
        }
        break;
      case 'name':
        response = await getRecipesByName(searchInput, recipesType);
        if (response !== null) {
          setRecipes(response);
          setIsFetching(false);
        } else {
          setShowAlert(true);
          setIsFetching(false);
        }
        break;
      case 'firstLetter':
        response = await getRecipesByFirstLetter(searchInput, recipesType);
        if (response !== null) {
          setRecipes(response);
          setIsFetching(false);
        } else {
          setShowAlert(true);
          setIsFetching(false);
        }
        break;
      default:
        setIsFetching(false);
        break;
      }
    }

    requestRecipes();
  }, [recipesType, recipesBy, categoryToFilter]);

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
        showAlert,
        setShowAlert,
      } }
    >
      {children}
    </mainContext.Provider>
  );
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
