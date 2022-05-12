import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import mainContext from '../contexts/mainContext';
import whiteHeartIcon from '../images/favorite_Icon_white.png';
import blackHeartIcon from '../images/favorite_Icon_red.png';
import '../styles/FavoriteBtn.css';

export default function FavoriteBtn({ idURL, recipe, testid }) {
  const { favoriteRecipes, handleInFavorites } = useContext(mainContext);
  return (
    <button
      className="favorite-btn"
      type="button"
      data-testid={ testid }
      onClick={ () => handleInFavorites(recipe) }
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
  recipe: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
  ).isRequired,
  testid: PropTypes.string.isRequired,
});
