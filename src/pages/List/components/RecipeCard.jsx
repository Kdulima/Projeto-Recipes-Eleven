import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import mainContext from '../../../contexts/mainContext';

export default function RecipeCard({ index, recipe }) {
  const { recipesType } = useContext(mainContext);
  const pathDetails = recipesType === 'meals' ? 'comidas' : 'bebidas';
  const type = recipesType === 'meals' ? 'Meal' : 'Drink';
  const id = recipe[`id${type}`];
  return (
    <div style={ { width: '40%' } } data-testid={ `${index}-recipe-card` }>
      <Link to={ `${pathDetails}/${id}` }>
        <img
          src={ recipe[`str${type}Thumb`] }
          alt={ `str${type}` }
          data-testid={ `${index}-card-img` }
          style={ { maxWidth: '100%' } }
        />
        <p data-testid={ `${index}-card-name` }>{ recipe[`str${type}`] }</p>
      </Link>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({}).isRequired,
};
