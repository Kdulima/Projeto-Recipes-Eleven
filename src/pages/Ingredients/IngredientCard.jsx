import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import { getIngredientPicture } from '../../services/recipesAPI';
import { Link } from 'react-router-dom';
import mainContext from '../../contexts/mainContext';

export default function IngredientCard({ index, ingredient }) {
  const { recipesType, setRecipesBy } = useContext(mainContext);
  const type = recipesType === 'meals' ? 'themeal' : 'thecocktail';

  return (
    <Link
      data-testid={ `${index}-ingredient-card` }
      to={
        type === 'themeal' ? '/comidas' : '/bebidas'
      }
      onClick={
        () => setRecipesBy({ searchInput: ingredient, searchType: 'ingredient' })
      }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ `https://www.${type}db.com/images/ingredients/${ingredient}-Small.png` }
        alt={ ingredient }
      />
      <p data-testid={ `${index}-card-name` }>{ ingredient }</p>
    </Link>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
};
