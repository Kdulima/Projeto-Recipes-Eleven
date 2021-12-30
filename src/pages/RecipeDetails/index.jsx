import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import mainContext from '../../contexts/mainContext';

import '../../styles/RecipeDetail.css';

import { getRecipeDetails, getRecipesByName } from '../../services/recipesAPI';

import DefaultLayout from '../../components/DefaultLayout';
import RecipeVideo from './components/RecipeVideo';
import IngredientsList from './components/IngredientsList';
import RecommendationsList from './components/RecommendationsList';

export default function RecipeDetails({ match, location, history }) {
  const {
    isMounted,
    recipesType,
    idType,
    inProgressRecipes,
    addInProgressRecipe,
    doneRecipes,
  } = useContext(mainContext);

  const [recipeDetail, setRecipeDetail] = useState({});
  const [recommendations, setRecommendatios] = useState([]);
  const [showShareMessage, setShowShareMessage] = useState(false);

  const idURL = match.params.id;
  const type = recipesType === 'drinks' ? 'cocktails' : 'meals';
  const {
    [`str${idType}`]: recipeTitle,
    [`str${idType}Thumb`]: recipePhoto,
    strAlcoholic,
    strCategory,
    strInstructions,
    strYoutube,
  } = recipeDetail;

  useEffect(() => {
    async function getDetails() {
      const response = await getRecipeDetails(idURL, recipesType);
      setRecipeDetail(...response);
      if (recipesType === 'drinks') {
        const mealRecommendations = await getRecipesByName('', 'meals');
        return setRecommendatios(mealRecommendations);
      }

      const drinkRecommendations = await getRecipesByName('', 'drinks');
      return setRecommendatios(drinkRecommendations);
    }
    if (isMounted) {
      getDetails();
    }
  }, [isMounted, idURL, recipesType]);

  function handleRecipeBtn() {
    addInProgressRecipe(idURL, type);
    if (recipesType === 'drinks') {
      return history.push(`/bebidas/${idURL}/in-progress`);
    }
    return history.push(`/comidas/${idURL}/in-progress`);
  }

  function copyToClipboard() {
    // Créditos para escrever no clipboard -> https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
    navigator.clipboard.writeText(global.location.href);
    setShowShareMessage(true);
  }

  return isMounted && (
    <DefaultLayout pathname={ location.pathname } hideAll>
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
        onClick={ copyToClipboard }
      >
        <img
          src={ shareIcon }
          alt="Share Icon"
        />
      </button>
      {showShareMessage && 'Link copiado!'}
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>

      <p data-testid="recipe-category">
        {`${strCategory} ${strAlcoholic || ''}`}
      </p>

      <IngredientsList recipeDetail={ recipeDetail } />

      <p data-testid="instructions">{strInstructions}</p>

      {strYoutube && <RecipeVideo
        strYoutube={ strYoutube }
        recipesType={ recipesType }
        recipeTitle={ recipeTitle }
      />}

      <div className="recommendation-list">
        <RecommendationsList
          recommendations={ recommendations }
          recipesType={ recipesType }
        />
      </div>

      {!doneRecipes.some(({ id }) => id === idURL) && (
        <div className="start-recipe-container">
          <button
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
            type="button"
            onClick={ handleRecipeBtn }
          >
            {inProgressRecipes[type] && inProgressRecipes[type][idURL] ? (
              'Continuar Receita'
            ) : ('Iniciar receita')}
          </button>
        </div>
      )}
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
});
