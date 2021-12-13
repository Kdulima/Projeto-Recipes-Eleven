import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import DefaultLayout from '../../components/DefaultLayout';
import RecipesList from './components/RecipesList';
import CategoryFilters from './components/CategoryFilters';
import mainContext from '../../contexts/mainContext';

export default function List({ history: { location: { pathname } } }) {
  const { recipes, recipesType, requestRecipes } = useContext(mainContext);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      console.log('primeiro fetch(da lista)');
      requestRecipes(undefined, 'drinks');
      setIsMounted(true);
    }
  }, [isMounted, requestRecipes]);

  return (
    <DefaultLayout pathname={ pathname }>
      {console.log('to montando a lista')}
      {recipes && recipes.length === 1 && (
        <Redirect
          to={
            `${pathname}/${recipes[0][`id${recipesType === 'meals' ? 'Meal' : 'Drink'}`]}`
          }
        />
      )}
      {recipes && recipes.length > 0 && (
        <>
          <CategoryFilters />
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
