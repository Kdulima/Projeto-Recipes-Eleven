import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import mainContext from '../../../contexts/mainContext';

export default function RecipeBtn({
  idURL,
  history,
  isInProgress,
  type,
  ingredientsLength,
}) {
  const {
    doneRecipes,
    recipesType,
    removeInProgressRecipe,
    handleInProgressRecipe,
    inProgressRecipes,
  } = useContext(mainContext);

  function handleRecipeBtn() {
    if (!inProgressRecipes[type]) {
      handleInProgressRecipe(idURL);
    }

    if (!isInProgress) {
      if (recipesType === 'drinks') {
        return history.push(`/bebidas/${idURL}/in-progress`);
      }
      return history.push(`/comidas/${idURL}/in-progress`);
    }
    removeInProgressRecipe(idURL);
    return history.push('/receitas-feitas');
  }

  function getButtonText() {
    if (isInProgress) return 'Finalizar receita';
    if (inProgressRecipes[type] && inProgressRecipes[type][idURL]) {
      return 'Continuar Receita';
    }
    return 'Iniciar receita';
  }

  return (
    !doneRecipes.some(({ id }) => id === idURL) && (
      <div className="start-recipe-container">
        <button
          variant="outline-danger"
          data-testid={ isInProgress ? 'finish-recipe-btn' : 'start-recipe-btn' }
          className="start-recipe-btn"
          type="button"
          onClick={ handleRecipeBtn }
          disabled={ inProgressRecipes[type] && isInProgress && (
            inProgressRecipes[type][idURL].length !== ingredientsLength) }
        >
          {getButtonText()}
        </button>
      </div>
    )
  );
}

RecipeBtn.defaultProps = {
  isInProgress: false,
};

RecipeBtn.propTypes = {
  idURL: PropTypes.string.isRequired,
  ingredientsLength: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  isInProgress: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
