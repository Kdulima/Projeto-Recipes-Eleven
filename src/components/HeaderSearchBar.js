import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  mainContext as FoodsContext, mainContext as DrinksContext,
} from '../contexts/mainContext';

export default function HeaderSearchBar(props) {
  const { isVisible } = props;

  const { foodBy, setFoodBy } = useContext(FoodsContext);
  const { drinkBy, setDrinkBy } = useContext(DrinksContext);
  const [type, setType] = useState('');

  const ingredientRadio = document.getElementById('ingredient');
  const nameRadio = document.getElementById('name');
  const firstLetterRadio = document.getElementById('firstLetter');
  const userSearchInput = document.getElementById('userSearchInput');

  const handleFirstLetterInput = (userSearchInputValue) => {
    if (userSearchInputValue.length > 1) {
      return global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  const handleFoodFetch = () => {
    if (ingredientRadio.checked) {
      setFoodBy({
        ...foodBy,
        [searchType]: ingredientRadio.value,
        [searchInput]: userSearchInput.value,
      });
    }
    if (nameRadio.checked) {
      setFoodBy({
        ...foodBy,
        [searchType]: nameRadio.value,
        [searchInput]: userSearchInput.value,
      });
    }
    if (firstLetterRadio.checked) {
      handleFirstLetterInput(userSearchInput.value);
      setFoodBy({
        ...foodBy,
        [searchType]: firstLetterRadio.value,
        [searchInput]: userSearchInput.value,
      });
    }
  };

  const handleDrinkFetch = () => {
    if (ingredientRadio.checked) {
      setDrinkBy({
        ...drinkBy,
        [searchType]: ingredientRadio.value,
        [searchInput]: userSearchInput.value,
      });
    }
    if (nameRadio.checked) {
      setDrinkBy({
        ...drinkBy,
        [searchType]: nameRadio.value,
        [searchInput]: userSearchInput.value,
      });
    }
    if (firstLetterRadio.checked) {
      handleFirstLetterInput(userSearchInput.value);
      setDrinkBy({
        ...drinkBy,
        [searchType]: firstLetterRadio.value,
        [searchInput]: userSearchInput.value,
      });
    }
  };

  const handleSubmit = (event, typeToSearch) => {
    event.preventDefault();

    switch (typeToSearch) {
    case 'food':
      handleFoodFetch();
      break;
    case 'drink':
      handleDrinkFetch();
      break;
    default:
      break;
    }
  };

  return (isVisible) && (
    <form onSubmit={ (event) => handleSubmit(event, type) }>
      <input type="text" data-testid="search-input" id="userSearchInput" />
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingredient"
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          type="radio"
          id="name"
        />
        Nome
      </label>
      <label htmlFor="firstLetter">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          id="firstLetter"
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
