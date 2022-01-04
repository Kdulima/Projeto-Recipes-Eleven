import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import mainContext from '../../../contexts/mainContext';

import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';

export default function FavoriteBtn({ idURL, recipeDetail }) {
  const { favoriteRecipes, handleInFavorites } = useContext(mainContext);
  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ () => handleInFavorites(recipeDetail) }
      // O teste valida o SRC do botão, mas esse SRC não mostra o coração dentro do botão
      // por isso ainda mantive a <img>, creio que irão remover esse SRC do botão nos testes.
      src={ favoriteRecipes.some(({ id }) => id === idURL) ? (
        blackHeartIcon
      ) : whiteHeartIcon }
    >
      {favoriteRecipes.some(({ id }) => id === idURL) ? (
        <img src={ blackHeartIcon } alt="Heart in favorite" />
      ) : <img src={ whiteHeartIcon } alt="Heart not in favorite" /> }
    </button>
  );
}

FavoriteBtn.propTypes = ({
  idURL: PropTypes.string.isRequired,
  recipeDetail: PropTypes.objectOf(PropTypes.string).isRequired,
});
