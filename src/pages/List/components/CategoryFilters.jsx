import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import Button from 'react-bootstrap/Button';
import './styles/CategoryFilters.css';
import mainContext from '../../../contexts/mainContext';

const AMOUNT_OF_FILTERS = 5;

export default function CategoryFilters({ categories }) {
  const {
    setCategoryToFilter,
    setRecipesBy,
  } = useContext(mainContext);

  function handleFilterSubmit(e) {
    const filterValue = e.target.innerText;
    setCategoryToFilter((prevState) => {
      if (prevState === filterValue) {
        return setRecipesBy((prevRecipesBy) => ({ ...prevRecipesBy }));
      }
      return filterValue;
    });
  }

  return (
    <div className="category-list">
      <button
        className="category-button"
        type="button"
        data-testid="All-category-filter"
        onClick={ handleFilterSubmit }
      >
        All
      </button>
      {categories.map((category, index) => (
        index < AMOUNT_OF_FILTERS ? (
          <button
            className="category-button"
            key={ index }
            type="button"
            onClick={ handleFilterSubmit }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            {category.strCategory}
          </button>
        ) : null))}
    </div>
  );
}

CategoryFilters.propTypes = ({
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
});
