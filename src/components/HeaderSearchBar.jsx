import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import mainContext from '../contexts/mainContext';

export default function HeaderSearchBar(props) {
  console.log(global.location);
  const { isVisible } = props;
  const {
    recipesType,
    setRecipesBy,
    requestRecipes,
  } = useContext(mainContext);

  const [inputSearch, setInputSearch] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [canTryRedirect, setCanTryRedirect] = useState(false);
  const [canRedirectMeal, setCanRedirectMeal] = useState(false);
  const [canRedirectDrink, setCanRedirectDrink] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (inputSearch.length > 1 && radioValue === 'firstLetter') {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    setRecipesBy({ searchType: radioValue, searchInput: inputSearch });
    setCanTryRedirect(true);
  };

  useEffect(() => {
    const handleRedirection = async () => {
      const response = await requestRecipes();
      setRecipes(response);
      if (response.length === 0) {
        setCanTryRedirect(false);
        return global.alert(
          'Sinto muito, não encontramos nenhuma receita para esses filtros',
        );
      }

      if (response.length === 1 && recipesType === 'meals') {
        setCanRedirectMeal(true);
      }

      if (response.length === 1 && recipesType === 'drinks') {
        setCanRedirectDrink(true);
      }
    };

    if (canTryRedirect) {
      handleRedirection();
    }
  }, [recipesType, canTryRedirect]);

  return (isVisible) && (
    <>
      {(canRedirectMeal) && <Redirect to={ `/comidas/${recipes[0].idMeal}` } />}
      {(canRedirectDrink) && <Redirect to={ `/bebidas/${recipes[0].idDrink}` } />}
      <form
        onSubmit={ handleSubmit }
      >
        <input
          type="text"
          data-testid="search-input"
          id="userSearchInput"
          value={ inputSearch }
          onChange={ (e) => setInputSearch(e.target.value) }
        />

        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            name="search-type"
            type="radio"
            id="ingredient"
            onChange={ (e) => setRadioValue(e.target.id) }
          />
          Ingrediente
        </label>

        <label htmlFor="name">
          <input
            data-testid="name-search-radio"
            type="radio"
            name="search-type"
            id="name"
            onChange={ (e) => setRadioValue(e.target.id) }
          />
          Nome
        </label>

        <label htmlFor="firstLetter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            name="search-type"
            id="firstLetter"
            onChange={ (e) => setRadioValue(e.target.id) }
          />
          Primeira letra
        </label>
        <button data-testid="exec-search-btn" type="submit">
          buscar
        </button>
      </form>
    </>
  );
}

HeaderSearchBar.propTypes = ({
  isVisible: PropTypes.bool.isRequired,
});
