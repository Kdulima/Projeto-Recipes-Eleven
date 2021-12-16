import React, { useContext } from 'react';
import mainContext from '../../../contexts/mainContext';
import RecipeCard from './RecipeCard';

const RECIPES_TO_SHOW = 12;

const RecipesList = () => {
  const { recipes } = useContext(mainContext);
  return recipes.map((recipe, index) => (
    index < RECIPES_TO_SHOW ? (
      <RecipeCard
        key={ index }
        index={ index }
        recipe={ recipe }
      />
    ) : null));
};

export default RecipesList;
