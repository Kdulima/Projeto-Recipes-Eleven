import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import mainContext from '../../contexts/mainContext';

import '../../styles/RecipeDetail.css';

import { getRecipeDetails, getRecipesByName } from '../../services/recipesAPI';

import DefaultLayout from '../../components/DefaultLayout';
import RecipeVideo from './components/RecipeVideo';
import IngredientsList from './components/IngredientsList';
import RecommendationsList from './components/RecommendationsList';
import FavoriteBtn from './components/FavoriteBtn';
import StartRecipeBtn from './components/StartRecipeBtn';
import ShareBtn from './components/ShareBtn';

export default function RecipeDetails({ match, location, history }) {
  const {
    isMounted,
    recipesType,
    idType,
  } = useContext(mainContext);

  const [recipeDetail, setRecipeDetail] = useState({});
  const [recommendations, setRecommendatios] = useState([]);

  const idURL = match.params.id;
  const {
    [`str${idType}`]: recipeTitle,
    [`str${idType}Thumb`]: recipePhoto,
    strAlcoholic,
    strCategory,
    strArea,
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

  return isMounted && (
    <DefaultLayout pathname={ location.pathname } hideAll>
      <img
        data-testid="recipe-photo"
        width="200"
        src={ recipePhoto }
        alt={ recipeTitle }
      />
      <p data-testid="recipe-title">{recipeTitle}</p>

      <ShareBtn />
      <FavoriteBtn
        idURL={ idURL }
        recipeDetail={ {
          id: idURL,
          type: recipesType,
          area: strArea || '',
          category: strCategory,
          alcoholicOrNot: strAlcoholic || '',
          name: recipeTitle,
          image: recipePhoto,
        } }
      />

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

      <StartRecipeBtn idURL={ idURL } history={ history } />
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
