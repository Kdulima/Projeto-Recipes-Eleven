import React, { useContext } from 'react';
import FoodsContext from '../contexts/mainContext';
import DrinksContext from '../contexts/mainContext';

// setFoodBy({ ...foodBy, [searchInput]: response });
const ingredientRadio = document.getElementById('ingredient');
const nameRadio = document.getElementById('name');
const firstLetterRadio = document.getElementById('firstLetter');
const userSearchInput = document.getElementById(/* pegar o id no req 12 */);

function SearchBar() {
  const { foodBy, setFoodBy } = useContext(FoodsContext);
  const { drinkBy, setDrinkBy } = useContext(DrinksContext);
  const [type, setType] = useState('');

  // const handleSearchType = (foodOrDrink) => {
  //   setType(foodOrDrink);
  // } colocar essa chamada na página que tiver a escolha entre comida e bebida

//   const handleFirstLetterInput = (/* userSearchInput.value */) => {
//     if (/* userSearch-input.value */.length > 1) {
//       return global.alert('Sua busca deve conter somente 1 (um) caracter');
//     }
//   }

  const handleFoodFetch = () => {
    if (ingredientRadio.checked) {
      setFoodBy({ ...foodBy, [searchType]: ingredientRadio.value, [searchInput]: userSearchInput.value })
    }
    if (nameRadio.checked) {
      setFoodBy({ ...foodBy, [searchType]: nameRadio.value, [searchInput]: userSearchInput.value })
    }
    if (firstLetterRadio.checked) {
      handleFirstLetterInput(/* userSearch-input.value */);
      setFoodBy({ ...foodBy, [searchType]: firstLetterRadio.value, [searchInput]: userSearchInput.value })
    }
  }

  const handleSubmit = (event, type) => {
    event.preventDefault();

    switch (type) {
      case 'food':

      default:
        break;
    }


  };

  return (
    <form>
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

export default SearchBar;
