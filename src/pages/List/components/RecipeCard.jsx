import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard({ index, recipe, recipeType }) {
  return (
    <div style={ { width: '40%' } } data-testid={ `${index}-recipe-card` }>
      <img
        src={ recipe[`str${recipeType}Thumb`] }
        alt={ `str${recipeType}` }
        data-testid={ `${index}-card-img` }
        style={ { maxWidth: '100%' } }
      />
      <p data-testid={ `${index}-card-name` }>{ recipe[`str${recipeType}`] }</p>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({

  }).isRequired,
  recipeType: PropTypes.string.isRequired,
};
