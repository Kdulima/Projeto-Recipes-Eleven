import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getIngredientPicture } from '../../services/recipesAPI';
import mainContext from '../../contexts/mainContext';

export default function IngredientCard({ index, ingredient }) {
  const { recipesType } = useContext(mainContext);
  const type = recipesType === 'meals' ? 'comidas' : 'bebidas';

  const [picture, setPicture] = useState('');

  useEffect(() => {
    async function fetchPicture() {
      const response = await getIngredientPicture(type, ingredient);
      setPicture(response);
    }
    fetchPicture();
  }, [type, ingredient]);

  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ picture }
        alt={ ingredient }
      />
      <p data-testid={ `${index}-card-name` }>{ ingredient }</p>
    </div>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
};
