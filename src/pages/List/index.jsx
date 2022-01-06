import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

import DefaultLayout from '../../components/DefaultLayout';
import RecipesList from './components/RecipesList';
import CategoryFilters from './components/CategoryFilters';

import { getRecipeCategories } from '../../services/recipesAPI';
import mainContext from '../../contexts/mainContext';

export default function List({ history: { location: { pathname } } }) {
  const {
    recipes,
    canTryRedirect,
    idType,
    recipesType,
  } = useContext(mainContext);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const response = await getRecipeCategories(recipesType);
      setCategories(response);
    }
    getCategories();
  }, [recipesType]);

  return (recipes) && (
    <DefaultLayout pathname={ pathname }>
      {(recipes.length === 1 && canTryRedirect) && (
        <Redirect
          to={
            `${pathname}/${recipes[0][`id${idType}`]}`
          }
        />
      )}

      {recipes.length > 0 && (
        <>
          <CategoryFilters categories={ categories } />
          <RecipesList />
        </>
      )}
    </DefaultLayout>
  );
}

List.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
