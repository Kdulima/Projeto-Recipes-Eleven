import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import mainContext from '../../contexts/mainContext';
import DefaultLayout from '../../components/DefaultLayout';
import { getRecipeDetails } from '../../services/recipesAPI';
import RecipeVideo from './components/RecipeVideo';

export default function RecipeDetails({ match, location }) {
  const { isMounted, recipesType, idType } = useContext(mainContext);
  const [recipeDetail, setRecipeDetail] = useState({});

  const idURL = match.params.id;

  const {
    [`str${idType}`]: recipeTitle,
    [`str${idType}Thumb`]: recipePhoto,
    strCategory,
    strInstructions,
    strYoutube,
  } = recipeDetail;

  useEffect(() => {
    async function getDetails() {
      const response = await getRecipeDetails(idURL, recipesType);
      setRecipeDetail(...response);
    }
    if (isMounted) {
      getDetails();
    }
  }, [isMounted, idURL, recipesType]);

  function renderIngredients() {
    const allKeys = Object.keys(recipeDetail);
    const ingredientkeys = allKeys.filter((key) => key.includes('strIngredient'));

    return ingredientkeys.map((ingredient, index) => (
      <p
        key={ ingredient }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        {recipeDetail[ingredient]}
      </p>
    ));
  }

  return isMounted && (
    <DefaultLayout pathname={ location.pathname } hideAll>
      <>
        <img
          data-testid="recipe-photo"
          width="200"
          src={ recipePhoto }
          alt={ recipeTitle }
        />
        <p data-testid="recipe-title">{recipeTitle}</p>

        <button
          type="button"
          data-testid="share-btn"
        >
          Compartilhar
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favoritar
        </button>

        <p data-testid="recipe-category">{strCategory}</p>
        {renderIngredients()}
        <p data-testid="instructions">{strInstructions}</p>

        {strYoutube && <RecipeVideo
          strYoutube={ strYoutube }
          recipesType={ recipesType }
          recipeTitle={ recipeTitle }
        />}

        <div data-testid="0-recomendation-card">Recomendações</div>

        <button
          data-testid="start-recipe-btn"
          type="button"
        >
          Iniciar receita
        </button>

      </>
    </DefaultLayout>
  );
}

RecipeDetails.propTypes = ({
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
});
