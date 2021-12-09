import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import mainContext from '../contexts/mainContext';

export default function HeaderSearchBar(props) {
  const { isVisible } = props;
  const {
    recipesType, recipes, recipesBy, setRecipesBy, requestRecipes,
  } = useContext(mainContext);
  const [state, setstate] = useState('');
  const [value, setvalue] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (state === 'firstLetter' && value.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    await setRecipesBy({
      searchType: state,
      searchInput: value,
    });
  };

  const handleRedirection = async () => {
    if (recipes.length === 0) {
      return global.alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros',
      );
    }

    if (recipes.length === 1 && recipesType === 'meals') {
      // <Redirect to={`/comidas/${recipes[0].idMeal}`} />

      history.push(`/comidas/${recipes[0].idMeal}`);
    }

    if (recipes.length === 1 && recipesType === 'drinks') {
      history.push(`/bebidas/${recipes[0].idDrink}`);
    }
  };

  useEffect(() => {
    requestRecipes();
    // handleRedirection();
  }, [recipesBy]);

  return (isVisible) && (
    <form
      onSubmit={ (event) => { handleSubmit(event); handleRedirection(); } }
    >
      <input
        type="text"
        data-testid="search-input"
        id="userSearchInput"
        value={ value }
        onChange={ (e) => setvalue(e.target.value) }
      />
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          name="search-type"
          type="radio"
          id="ingredient"
          onChange={ (e) => setstate(e.target.id) }
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          type="radio"
          name="search-type"
          id="name"
          onChange={ (e) => setstate(e.target.id) }
        />
        Nome
      </label>
      <label htmlFor="firstLetter">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="search-type"
          id="firstLetter"
          onChange={ (e) => setstate(e.target.id) }
        />
        Primeira letra
      </label>
      <button data-testid="exec-search-btn" type="submit">
        buscar
      </button>
    </form>
  );
}

HeaderSearchBar.propTypes = ({
  isVisible: PropTypes.bool.isRequired,
  history: PropTypes.string.isRequired,
});
