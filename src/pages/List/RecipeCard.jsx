import React, { useState, useContext } from 'react';
import mainContext from '../../contexts/mainContext';

export default function RecipeCard() {
  const { isFetching, recipes, recipesType } = useContext(mainContext);
  const [mealOrDrink, setMealOrDrink] = useState('');
  const maxRecipesPerPage = 12;

  if (recipesType === 'meals') { setMealOrDrink('Meal'); }
  if (recipesType === 'drinks') { setMealOrDrink('Drink'); }

  return (
    (isFetching)
      ? (
        <p>loading...</p>
      )
      : (
        <div>
          { recipes.slice(0, maxRecipesPerPage).map((recipe, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ `${recipe}.str${mealOrDrink}Thumb` }
                alt={ `${recipe}.str${mealOrDrink}` }
              />
              <span data-testid={ `${index}-card-name` }>
                { `${recipe}.str${mealOrDrink}` }
              </span>
            </div>
          ))}
        </div>
      )
  );
}
