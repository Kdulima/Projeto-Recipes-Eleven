import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import DefaultLayout from '../../components/DefaultLayout';
import RecipesList from './components/RecipesList';
import CategoryFilters from './components/CategoryFilters';
import mainContext from '../../contexts/mainContext';

const renderRecipeList = () => (
  <>
    <CategoryFilters />
    <RecipesList />
  </>
);

export default function List({ history: { location: { pathname } } }) {
  const { recipes, recipesType, requestRecipes } = useContext(mainContext);

  useEffect(() => {
    requestRecipes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DefaultLayout pathname={ pathname }>
      {recipes && recipes.length === 1 && (
        <Redirect
          to={
            `${pathname}/${recipes[0][`id${recipesType === 'meals' ? 'Meal' : 'Drink'}`]}`
          }
        />
      )}
      {recipes && recipes.length > 0 && renderRecipeList()}
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
