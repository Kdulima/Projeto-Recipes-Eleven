import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import mainContext from '../../../contexts/mainContext';

const AMOUNT_OF_FILTERS = 5;

export default function CategoryFilters({ categories }) {
  const {
    setCategoryToFilter,
    setRecipesBy,
  } = useContext(mainContext);

  function handleFilterSubmit(e) {
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
        onClick={ handleFilterSubmit }
      />
      {categories.map((category, index) => (
        index < AMOUNT_OF_FILTERS ? (
          <Button
            key={ index }
            as="input"
            type="button"
            value={ category.strCategory }
            onClick={ handleFilterSubmit }
            data-testid={ `${category.strCategory}-category-filter` }
          />
        ) : null))}
    </div>
  );
}

CategoryFilters.propTypes = ({
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
});
