import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
// Removido Collapse pois estava quebrando os testes
// import { Collapse } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import mainContext from '../contexts/mainContext';
import '../styles/HeaderSearchBar.css';

export default function HeaderSearchBar(props) {
  const { isVisible } = props;
  const { setRecipesBy } = useContext(mainContext);

  const [inputSearch, setInputSearch] = useState('');
  const [radioValue, setRadioValue] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (inputSearch.length > 1 && radioValue === 'firstLetter') {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    setRecipesBy({ searchType: radioValue, searchInput: inputSearch });
  };

  return isVisible && (
    <>
      <div className="search-input">
        <input
          type="text"
          data-testid="search-input"
          id="userSearchInput"
          value={ inputSearch }
          onChange={ (e) => setInputSearch(e.target.value) }
        />
        <Button
          className="btn btn-danger"
          data-testid="exec-search-btn"
          type="submit"
        >
          buscar
        </Button>
      </div>
      <form
        onSubmit={ handleSubmit }
        className="search-bar"
      >

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
      </form>
    </>
  );
}

HeaderSearchBar.propTypes = ({
  isVisible: PropTypes.bool.isRequired,
});
