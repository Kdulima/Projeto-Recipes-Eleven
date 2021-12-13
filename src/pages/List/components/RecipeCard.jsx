import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import mainContext from '../../../contexts/mainContext';

export default function RecipeCard({ index, recipe }) {
  const { recipesType } = useContext(mainContext);
  const type = recipesType === 'meals' ? 'Meal' : 'Drink';
  return (
    <div style={ { width: '40%' } } data-testid={ `${index}-recipe-card` }>
      <img
        src={ recipe[`str${type}Thumb`] }
        alt={ `str${type}` }
        data-testid={ `${index}-card-img` }
        style={ { maxWidth: '100%' } }
      />
      <p data-testid={ `${index}-card-name` }>{ recipe[`str${type}`] }</p>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({}).isRequired,
};
