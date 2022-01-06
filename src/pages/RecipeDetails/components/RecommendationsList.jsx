import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function RecommendationsList({ recommendations, recipesType }) {
  const MAX_LENGTH = 6;
  const idType = recipesType === 'meals' ? 'Drink' : 'Meal';
  const pathToSend = recipesType === 'meals' ? '/bebidas' : '/comidas';

  return recommendations.map((recipe, index) => {
    if (index < MAX_LENGTH) {
      return (
        <Link
          to={ `${pathToSend}/${recipe[`id${idType}`]}` }
          key={ index }
          data-testid={ `${index}-recomendation-card` }
        >
          <img
            src={ recipe[`str${idType}Thumb`] }
            alt={ recipe[`str${idType}`] }
          />
          <span data-testid={ `${index}-recomendation-title` }>
            {recipe[`str${idType}`]}
          </span>
        </Link>
      );
    }
    return '';
  });
}

RecommendationsList.propTypes = ({
  recommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
});
