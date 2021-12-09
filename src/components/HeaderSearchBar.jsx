import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import mainContext from '../contexts/mainContext';

export default function HeaderSearchBar(props) {
  const { isVisible } = props;
  const { recipesBy, setRecipesBy, requestRecipes } = useContext(mainContext);
  const [state, setstate] = useState('');
  const [value, setvalue] = useState('');

  // const handleFirstLetterInput = (userSearchInputValue) => {
  //   if (userSearchInputValue.length > 1) {
  //     return global.alert('Sua busca deve conter somente 1 (um) caracter');
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (state === 'firstLetter' && value.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
      // handleFirstLetterInput(value);
      // return;
    }
    await setRecipesBy({
      searchType: state,
      searchInput: value,
    });
  };

  useEffect(() => {
    requestRecipes();
  }, [recipesBy]);

  return (isVisible) && (
    <form onSubmit={ (event) => handleSubmit(event) }>
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
});
