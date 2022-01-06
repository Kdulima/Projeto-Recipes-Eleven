import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DefaultLayout from '../../components/DefaultLayout';
import { getIngredients } from '../../services/recipesAPI';
import IngredientCard from './IngredientCard';

export default function Ingredients({ location: { pathname } }) {
  const foodOrDrink = pathname.includes('comidas')
    ? { typeName: 'comidas', keyType: 'strIngredient' }
    : { typeName: 'bebidas', keyType: 'strIngredient1' };

  const [ingredients, setIngredients] = useState([]);

  const maxCardAmount = 12;

  useEffect(() => {
    async function fetchIngredients() {
      const response = await getIngredients(foodOrDrink.typeName);
      setIngredients(response);
    }
    fetchIngredients();
  }, [foodOrDrink.typeName]);

  return (
    ingredients.length > 0 && (
      <DefaultLayout pathname={ pathname }>
        <div>
          { ingredients.map((ingredient, index) => (
            index < maxCardAmount
            && <IngredientCard
              key={ index }
              index={ index }
              ingredient={ ingredient[foodOrDrink.keyType] }
            />
          ))}
        </div>
      </DefaultLayout>
    ));
}

Ingredients.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
