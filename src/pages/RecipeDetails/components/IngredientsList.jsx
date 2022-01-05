import React, { useContext } from 'react';
import mainContext from '../../../contexts/mainContext';

export default function IngredientsList({ id, recipeDetail, ingredients, isInProgress }) {
  const { setInProgressRecipe, inProgressRecipes, recipesType } = useContext(mainContext);

  function renderInput(index) {
    const type = recipesType === 'drinks' ? 'cocktails' : 'meals';
    let checked = false;
    if (
      inProgressRecipes[type]
      && inProgressRecipes[type][id]
      && inProgressRecipes[type][id][index]
    ) {
      checked = true;
    }
    return (
      <input
        type="checkbox"
        name="ingredient-step"
        id={ `${index}-ingredient-step` }
        checked={ checked }
        onChange={ (e) => {
          if (inProgressRecipes[type]) {
            const ingredientsProgress = inProgressRecipes[type][id];
            ingredientsProgress[index] = e.target.checked;
            setInProgressRecipe(id, ingredientsProgress);
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
      {isInProgress && renderInput(index)}
      {recipeDetail[`strMeasure${index + 1}`]}
      {recipeDetail[ingredient]}
    </label>
  ));
}

IngredientsList.defaultProps = {
  id: null,
};
