import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import mainContext from '../../../contexts/mainContext';
import './styles/RecipesCard.css';

const RecipesList = () => {
  const { recipes, recipesType } = useContext(mainContext);
  const pathDetails = recipesType === 'meals' ? 'comidas' : 'bebidas';
  const type = recipesType === 'meals' ? 'Meal' : 'Drink';
  const RECIPES_TO_SHOW = 12;

  return recipes.map((recipe, index) => (
    index < RECIPES_TO_SHOW ? (
      <div
        className="recipes-card"
        key={ index }
        data-testid={ `${index}-recipe-card` }
      >
        <Link to={ `/${pathDetails}/${recipe[`id${type}`]}` }>
          <img
            src={ recipe[`str${type}Thumb`] }
            alt={ `str${type}` }
            data-testid={ `${index}-card-img` }
            style={ { maxWidth: '100%' } }
          />
          <p data-testid={ `${index}-card-name` }>{ recipe[`str${type}`] }</p>
        </Link>
      </div>
    ) : null));
};

export default RecipesList;
