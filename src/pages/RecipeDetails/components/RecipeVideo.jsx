// Solução para formato do video: https://stackoverflow.com/questions/66099180/react-js-error-the-service-worker-navigation-preload-request-was-cancelled-befo
import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeVideo({ strYoutube, recipesType, recipeTitle }) {
  return strYoutube && (recipesType === 'meals') && (
    <iframe
      width="300"
      height="200"
      data-testid="video"
      src={
        `https://www.youtube-nocookie.com/embed/${strYoutube.split('watch?v=')[1]}`
      }
      title={ `Video de como fazer: ${recipeTitle}` }
    />
  );
}

RecipeVideo.propTypes = ({
  strYoutube: PropTypes.string.isRequired,
  recipeTitle: PropTypes.string.isRequired,
  recipesType: PropTypes.string.isRequired,
});
