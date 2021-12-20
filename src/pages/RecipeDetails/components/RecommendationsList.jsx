import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function RecommendationsList({ recommendations, recipesType }) {
  const MAX_LENGTH = 6;
  // console.log(recommendations[0]);
  const idType = recipesType === 'meals' ? 'Drink' : 'Meal';
  const pathToSend = recipesType === 'meals' ? '/bebidas' : '/comidas';

  return recommendations.map((recipe, index) => {
    if (index < MAX_LENGTH) {
      return (
        <div
          key={ index }
          data-testid={ `${index}-recomendation-card` }
        >
          <Link
            to={ `${pathToSend}/${recipe[`id${idType}`]}` }
          >
            <p data-testid={ `${index}-recomendation-title` }>
              {console.log(index)}
              {recipe[`str${idType}`]}
            </p>
          </Link>
        </div>
      );
    }
    return '';
  });
}

RecommendationsList.propTypes = ({
  recommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
});
