import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import mainContext from '../../../contexts/mainContext';

const AMOUNT_OF_FILTERS = 5;
const { mealsCategories } = require('../mealCategories');
const { drinksCategories } = require('../drinkCategories');

function CategoryFilters() {
  const { setCategoryToFilter, recipesType } = useContext(mainContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (recipesType === 'meals') {
      return setCategories(mealsCategories);
    }

    setCategories(drinksCategories);
  }, [recipesType]);

  return (
    <div>
      <Button
        as="input"
        type="button"
        value="All"
        onClick={ () => setCategoryToFilter('') }
      />
      {categories.map((category, index) => (
        index < AMOUNT_OF_FILTERS ? (
          <Button
            key={ index }
            as="input"
            type="button"
            value={ category.strCategory }
            onClick={ () => setCategoryToFilter(category.strCategory) }
            data-testid={ `${category.strCategory}-category-filter` }
          />
        ) : null))}
    </div>
  );
}

export default CategoryFilters;

// CategoryFilters.propTypes = {
//   categories: PropTypes.arrayOf(PropTypes.shape({
//     strCategory: PropTypes.string.isRequired,
//   })).isRequired,
// };
