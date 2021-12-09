import React from 'react';
import PropTypes from 'prop-types';
import DrinksContext from '../contexts/mainContext';
import {
  getDrinksByFirstLetter, getDrinksByIngredient, getDrinksByName,
} from '../services/drinksAPI';

function DrinksProvider({ children }) {
  const [isFetching, setIsFetching] = useState(false);
  const [drink, setDrink] = useState([]);
  // abaixo seria o tipo, comida ou bebida, talvez colocar em um provider mais externo?
  // const [type, setType] = useState('');
  const [drinkBy, setDrinkBy] = useState({ searchType: '', searchInput: '' }); // aqui dependeria de qual radio estaria marcado

  async function requestDrinks() {
    setIsFetching(true);
    let response;

    switch (drinkBy.searchType) {
    case 'ingredient':
      response = await getDrinksByIngredient(drinkBy.searchInput);
      setDrink(response);
      setIsFetching(false);
      break;
    case 'name':
      response = await getDrinksByName(drinkBy.searchInput);
      setDrink(response);
      setIsFetching(false);
      break;
    case 'firstLetter':
      response = await getDrinksByFirstLetter(drinkBy.searchInput);
      setDrink(response);
      setIsFetching(false);
      break;
    default:
      setDrink(...drink);
      setIsFetching(false);
      break;
    }
  }

  return (
    <DrinksContext.Provider
      value={ {
        isFetching,
        drink,
        drinkBy,
        setDrinkBy,
        requestDrinks,
      } }
    >
      { children }
    </DrinksContext.Provider>
  );
}

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrinksProvider;
