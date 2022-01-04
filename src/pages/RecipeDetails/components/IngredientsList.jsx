import React from 'react';
// import React, { useContext } from 'react';
// import mainContext from '../../../contexts/mainContext';

export default function IngredientsList({ recipeDetail, ingredients, isInProgress }) {
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
      {isInProgress && (
        <input
          type="checkbox"
          name="ingredient-step"
          id={ `${index}-ingredient-step` }
          onChange={ () => {
            // ingredientsProgress[index] = e.target.checked;
            // addInProgressRecipe(id, ingredientsProgress);
          } }
        />
      )}
      {recipeDetail[`strMeasure${index + 1}`]}
      {recipeDetail[ingredient]}
    </label>
  ));
}

IngredientsList.defaultProps = {
  id: null,
};
