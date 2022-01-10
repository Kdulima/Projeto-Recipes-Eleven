import React, { useContext } from 'react';
import mainContext from '../../../contexts/mainContext';
import RecipeCardByArea from './RecipeCardByArea';

const RECIPES_TO_SHOW = 12;

const RecipesByAreaList = () => {
  const { recipes } = useContext(mainContext);

  return recipes.map((recipe, index) => (
    index < RECIPES_TO_SHOW ? (
      <RecipeCardByArea
        key={ index }
        index={ index }
        recipe={ recipe }
      />
    ) : null));
};

export default RecipesByAreaList;
