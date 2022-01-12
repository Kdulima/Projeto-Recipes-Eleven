import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import DefaultLayout from '../components/DefaultLayout';
import { getRandomRecipeId } from '../services/recipesAPI';
import mainContext from '../contexts/mainContext';

export default function ExploreFoodOrDrinks(props) {
  const { history: { push, location: { pathname } } } = props;
  const { setRecipesBy } = useContext(mainContext);

  const foodOrDrinks = pathname.includes('comidas') ? 'comidas' : 'bebidas';
  return (
    <DefaultLayout pathname={ pathname }>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ () => push(`${foodOrDrinks}/ingredientes`) }
      >
        Por Ingredientes
      </button>

      { pathname.includes('comidas') && (
        <button
          type="button"
          data-testid="explore-by-area"
          onClick={ () => {
            push('comidas/area');
            setRecipesBy({ searchInput: '', searchType: 'area' });
          } }
        >
          Por Local de Origem
        </button>
      ) }

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ async () => {
          const id = await getRandomRecipeId(foodOrDrinks);
          push(`/${foodOrDrinks}/${id}`);
        } }
      >
        Me Surpreenda!
      </button>
    </DefaultLayout>
  );
}

ExploreFoodOrDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
