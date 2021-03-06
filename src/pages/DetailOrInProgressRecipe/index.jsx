import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getRecipeDetails, getRecipesByName } from '../../services/recipesAPI';
import mainContext from '../../contexts/mainContext';
import DefaultLayout from '../../components/DefaultLayout';
import RecipeVideo from './components/RecipeVideo';
import IngredientsList from './components/IngredientsList';
import RecommendationsList from './components/RecommendationsList';
import FavoriteBtn from '../../components/FavoriteBtn';
import RecipeBtn from './components/RecipeBtn';
import ShareBtn from './components/ShareBtn';
import '../../styles/RecipeDetail.css';
import './index.css';

const getIngredients = (recipeDetail) => {
  const allKeys = Object.keys(recipeDetail);
  const ingredientKeys = allKeys.filter((key) => key.includes('strIngredient'));
  return ingredientKeys.filter(
    (ingredient) => recipeDetail[ingredient],
  );
};
export default function DetailOrInProgressRecipe({ match, location, history }) {
  const {
    isMounted,
    recipesType,
    idType,
    inProgressRecipes,
    handleInProgressRecipe,
  } = useContext(mainContext);

  const [recipeDetail, setRecipeDetail] = useState({});
  const [recommendations, setRecommendatios] = useState([]);

  const idURL = match.params.id;
  const type = recipesType === 'drinks' ? 'cocktails' : 'meals';
  const isInProgress = match.url.includes('in-progress');

  const {
    [`str${idType}`]: recipeTitle,
    [`str${idType}Thumb`]: recipePhoto,
    strAlcoholic,
    strCategory,
    strArea,
    strInstructions,
    strYoutube,
  } = recipeDetail;
  const ingredients = getIngredients(recipeDetail);

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
      if (!inProgressRecipes[type]) {
        handleInProgressRecipe(idURL);
      }
    }
  }, [isMounted, idURL, recipesType, inProgressRecipes, handleInProgressRecipe, type]);

  return (
    isMounted && (
      <DefaultLayout pathname={ location.pathname } hideAll>
        <div className="recipes-card">
          <img
            className="recipe-photo"
            data-testid="recipe-photo"
            width="200"
            src={ recipePhoto }
            alt={ recipeTitle }
          />
          <p className="recipe-title" data-testid="recipe-title">{recipeTitle}</p>
        </div>
        <div className="recipe-buttons">
          <ShareBtn />
          <FavoriteBtn
            idURL={ idURL }
            recipe={ {
              id: idURL,
              type: recipesType === 'drinks' ? 'bebida' : 'comida',
              area: strArea || '',
              category: strCategory,
              alcoholicOrNot: strAlcoholic || '',
              name: recipeTitle,
              image: recipePhoto,
            } }
            testid="favorite-btn"
          />
        </div>

        <p data-testid="recipe-category">
          {`${strCategory} ${strAlcoholic || ''}`}
        </p>

        <IngredientsList
          recipeDetail={ recipeDetail }
          ingredients={ ingredients }
          id={ idURL }
          isInProgress={ isInProgress }
        />

        <div className="recommendation-list">
          <RecommendationsList
            recommendations={ recommendations }
            recipesType={ recipesType }
          />
        </div>

        <p
          className="paragraph-instructions"
          data-testid="instructions"
        >
          {strInstructions}
        </p>

        {strYoutube && (
          <RecipeVideo
            strYoutube={ strYoutube }
            recipesType={ recipesType }
            recipeTitle={ recipeTitle }
          />
        )}

        <RecipeBtn
          idURL={ idURL }
          history={ history }
          ingredientsLength={ ingredients.length }
          isInProgress={ isInProgress }
          type={ type }
        />
      </DefaultLayout>
    )
  );
}

DetailOrInProgressRecipe.propTypes = ({
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
});
