import React from 'react';
import RecipeCard from './RecipeCard';

const RECIPES_TO_SHOW = 12;
const RecipesList = ({ recipes, recipeType }) => recipes
  .map((recipe, index) => (index < RECIPES_TO_SHOW ? (
    <RecipeCard
      key={ index }
      index={ index }
      recipe={ recipe }
      recipeType={ recipeType }
    />
  ) : null));

export default RecipesList;
