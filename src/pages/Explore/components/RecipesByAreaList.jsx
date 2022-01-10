import React, { useContext, useEffect, useState } from 'react';
import mainContext from '../../../contexts/mainContext';
import RecipeCard from '../../List/components/RecipeCard';

const RECIPES_TO_SHOW = 12;

const RecipesByAreaList = () => {
  const { recipes, areaSelected } = useContext(mainContext);
  const [response, setResponse] = useState(recipes);

  useEffect(() => {
    function getRecipesCards() {
      if (areaSelected === 'All') {
        setResponse(recipes);
      } else {
        setResponse(recipes.filter((recipe) => recipe.strArea === areaSelected));
      }
    }
    getRecipesCards();
  }, [areaSelected, recipes]);

  return response.map((recipe, index) => (
    index < RECIPES_TO_SHOW ? (
      <RecipeCard
        key={ index }
        index={ index }
        recipe={ recipe }
      />
    ) : null));
};

export default RecipesByAreaList;
