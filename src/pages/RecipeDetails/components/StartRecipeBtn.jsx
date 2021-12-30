import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import mainContext from '../../../contexts/mainContext';

export default function StartRecipeBtn({ idURL, history }) {
  const {
    doneRecipes,
    recipesType,
    inProgressRecipes,
    addInProgressRecipe,
  } = useContext(mainContext);

  const type = recipesType === 'drinks' ? 'cocktails' : 'meals';

  function handleRecipeBtn() {
    addInProgressRecipe(idURL, type);
    if (recipesType === 'drinks') {
      return history.push(`/bebidas/${idURL}/in-progress`);
    }
    return history.push(`/comidas/${idURL}/in-progress`);
  }

  return !doneRecipes.some(({ id }) => id === idURL) && (
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
  );
}

StartRecipeBtn.propTypes = ({
  idURL: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
});
