import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import mainContext from '../../../contexts/mainContext';

function handleRecipeBtn(
  history,
  recipesType,
  { idURL,
    isInProgress,
    hasPreviousProgress,
    ingredientsLength },
  { setInProgressRecipe,
    removeInProgressRecipe },
) {
  if (!isInProgress) {
    if (!hasPreviousProgress) {
      const initialProgress = new Array(ingredientsLength).fill(false);
      setInProgressRecipe(idURL, initialProgress);
    }
    if (recipesType === 'drinks') {
      return history.push(`/bebidas/${idURL}/in-progress`);
    }
    return history.push(`/comidas/${idURL}/in-progress`);
  }
  removeInProgressRecipe(idURL);
  return history.push('/receitas-feitas');
}

export default function RecipeBtn({
  idURL,
  history,
  ingredientsLength,
  isInProgress,
  hasPreviousProgress,
}) {
  const {
    doneRecipes,
    recipesType,
    setInProgressRecipe,
    removeInProgressRecipe,
  } = useContext(mainContext);

  const recipeInfo = {
    idURL,
    ingredientsLength,
    isInProgress,
    hasPreviousProgress,
  };
  const handleRecipesFunctions = {
    setInProgressRecipe,
    removeInProgressRecipe,
  };

  function getButtonText() {
    if (isInProgress) return 'Finalizar receita';
    if (hasPreviousProgress) return 'Continuar Receita';
    return 'Iniciar receita';
  }

  return (
    !doneRecipes.some(({ id }) => id === idURL) && (
      <div className="start-recipe-container">
        <button
          data-testid={ isInProgress ? 'finish-recipe-btn' : 'start-recipe-btn' }
          className="start-recipe-btn"
          type="button"
          onClick={ () => handleRecipeBtn(
            history,
            recipesType,
            recipeInfo,
            handleRecipesFunctions,
          ) }
        >
          {getButtonText()}
        </button>
      </div>
    )
  );
}

RecipeBtn.defaultProps = {
  isInProgress: false,
  hasPreviousProgress: false,
};

RecipeBtn.propTypes = {
  idURL: PropTypes.string.isRequired,
  isInProgress: PropTypes.bool,
  hasPreviousProgress: PropTypes.bool,
  ingredientsLength: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
