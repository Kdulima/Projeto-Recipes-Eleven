import React from 'react';
import PropTypes from 'prop-types';
import MealsContext from '../contexts/mainContext';
import {
  getFoodsByFirstLetter, getFoodsByIngredient, getFoodsByName,
} from '../services/foodsAPI';

function MealsProvider({ children }) {
  const [isFetching, setIsFetching] = useState(false);
  const [food, setFood] = useState([]);
  // abaixo seria o tipo, comida ou bebida, talvez colocar em um provider mais externo?
  // const [type, setType] = useState('');
  const [foodBy, setFoodBy] = useState({ searchType: '', searchInput: '' }); // aqui dependeria de qual radio estaria marcado

  async function requestFoods() {
    setIsFetching(true);
    let response;

    switch (foodBy.searchType) {
    case 'ingredient':
      response = await getFoodsByIngredient(foodBy.searchInput);
      setFood(response);
      setIsFetching(false);
      break;
    case 'name':
      response = await getFoodsByName(foodBy.searchInput);
      setFood(response);
      setIsFetching(false);
      break;
    case 'firstLetter':
      response = await getFoodsByFirstLetter(foodBy.searchInput);
      setFood(response);
      setIsFetching(false);
      break;
    default:
      setFood(...food);
      setIsFetching(false);
      break;
    }
  }

  return (
    <MealsContext.Provider
      value={ {
        isFetching,
        food,
        foodBy,
        setFoodBy,
        requestFoods,
      } }
    >
      { children }
    </MealsContext.Provider>
  );
}

MealsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MealsProvider;
