import React from 'react';
import PropTypes from 'prop-types';
import RecipesList from './components/RecipesList';
import CategoryFilters from './components/CategoryFilters';

const renderRecipeList = () => (
  <>
    <CategoryFilters />
    <RecipesList />
  </>
);

const selectProviderByRecipeType = (recipeType) => {
  if (recipeType === 'Meal') {
    return (
      <MealProvider>
        {renderRecipeList()}
      </MealProvider>
    );
  }
  return (
    <DrinkProvider>
      {renderRecipeList()}
    </DrinkProvider>
  );
};

export default function List({ history }) {
  const { location: { pathname } } = history;
  const recipeType = pathname === '/comidas' ? 'Meal' : 'Drink';
  return (
    <>
      <span>header</span>
      {selectProviderByRecipeType(recipeType)}
      <span>footer</span>
    </>
  );
}

List.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
