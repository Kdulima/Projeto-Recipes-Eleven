import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import mainContext from '../../../contexts/mainContext';

function handleRecipeBtn(
  history,
  recipesType,
  { idURL,
    isInProgress,
    ingredientsLength },
  { addInProgressRecipe,
    removeInProgressRecipe },
) {
  if (!isInProgress) {
    const initialProgress = new Array(ingredientsLength).fill(false);
    addInProgressRecipe(idURL, initialProgress);
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
}) {
  const {
    doneRecipes,
    recipesType,
    inProgressRecipes,
    addInProgressRecipe,
    removeInProgressRecipe,
  } = useContext(mainContext);

  const recipeInfo = {
    idURL,
    ingredientsLength,
    isInProgress,
  };
  const handleRecipesFunctions = {
    addInProgressRecipe,
    removeInProgressRecipe,
  };

  function getButtonText() {
    const type = recipesType === 'drinks' ? 'cocktails' : 'meals';
    if (isInProgress) return 'Finalizar receita';
    if (inProgressRecipes[type]
      && inProgressRecipes[type][idURL]) return 'Continuar receita';
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
};

RecipeBtn.propTypes = {
  idURL: PropTypes.string.isRequired,
  isInProgress: PropTypes.bool,
  ingredientsLength: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
