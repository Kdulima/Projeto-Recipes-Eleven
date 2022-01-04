import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import mainContext from '../../../contexts/mainContext';

const AMOUNT_OF_FILTERS = 5;
const { mealsCategories } = require('../mealCategories');
const { drinksCategories } = require('../drinkCategories');

function CategoryFilters() {
  const {
    setCategoryToFilter,
    recipesType,
    setRecipesBy,
  } = useContext(mainContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (recipesType === 'meals') {
      return setCategories(mealsCategories);
    }

    setCategories(drinksCategories);
  }, [recipesType]);

  function handleTest(e) {
    const filterValue = e.target.value;
    setCategoryToFilter((prevState) => {
      if (prevState === filterValue) {
        return setRecipesBy((prevRecipesBy) => ({ ...prevRecipesBy }));
      }
      return filterValue;
    });
  }

  return (
    <div>
      <Button
        as="input"
        type="button"
        value="All"
        data-testid="All-category-filter"
        onClick={ handleTest }
      />
      {categories.map((category, index) => (
        index < AMOUNT_OF_FILTERS ? (
          <Button
            key={ index }
            as="input"
            type="button"
            value={ category.strCategory }
            onClick={ handleTest }
            data-testid={ `${category.strCategory}-category-filter` }
          />
        ) : null))}
    </div>
  );
}

export default CategoryFilters;
