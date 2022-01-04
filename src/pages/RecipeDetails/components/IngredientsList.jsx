import React from 'react';

export default function IngredientsList({ recipeDetail }) {
  const allKeys = Object.keys(recipeDetail);
  const ingredientkeys = allKeys.filter((key) => key.includes('strIngredient'));

  return ingredientkeys.map((ingredient, index) => {
    if (recipeDetail[ingredient]) {
      return (
        <p
          key={ ingredient }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {recipeDetail[`strMeasure${index + 1}`]}
          {recipeDetail[ingredient]}
        </p>
      );
    }
    return '';
  });
}
