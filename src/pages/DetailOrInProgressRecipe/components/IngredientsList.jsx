import React, { useContext } from 'react';
import mainContext from '../../../contexts/mainContext';

export default function IngredientsList({ id, recipeDetail, ingredients, isInProgress }) {
  const {
    handleInProgressRecipe,
    inProgressRecipes,
    recipesType,
  } = useContext(mainContext);

  function renderInput(index, ingredient) {
    const type = recipesType === 'drinks' ? 'cocktails' : 'meals';
    const progressType = inProgressRecipes[type];
    return (
      <input
        type="checkbox"
        id={ `${index}-ingredient-step` }
        checked={ progressType && progressType[id].includes(ingredient) }
        onClick={ (e) => {
          if (e.target.checked) {
            handleInProgressRecipe(id, [...progressType[id], ingredient]);
          } else {
            handleInProgressRecipe(id, progressType[id].filter((i) => i !== ingredient));
          }
        } }
      />
    );
  }

  return ingredients.map((ingredient, index) => (
    <label
      key={ ingredient }
      htmlFor={ `${index}-ingredient-step` }
      data-testid={
        isInProgress
          ? `${index}-ingredient-step`
          : `${index}-ingredient-name-and-measure`
      }
    >
      {isInProgress && renderInput(index, recipeDetail[ingredient])}
      {recipeDetail[`strMeasure${index + 1}`]}
      {recipeDetail[ingredient]}
    </label>
  ));
}

IngredientsList.defaultProps = {
  id: null,
};
