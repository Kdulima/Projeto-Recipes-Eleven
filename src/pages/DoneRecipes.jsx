import React, { useContext } from 'react';

import mainContext from '../contexts/mainContext';
import DefaultLayout from '../components/DefaultLayout';

export default function DoneRecipes() {
  const { doneRecipes, isMounted } = useContext(mainContext);
  return isMounted && (
    <DefaultLayout pathname="/receitas-feitas">
      {console.log(doneRecipes)}
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
        >
          Foods
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drinks
        </button>
      </div>

      <div>
        {doneRecipes.map((recipe, index) => {
          const { image, name, category, doneDate, tags } = recipe;
          return (
            <div key={ index }>
              <img
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-top-text` }>{category}</p>
              <p data-testid={ `${index}-horizontal-name` }>{name}</p>
              <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>

              <button
                data-testid={ `${index}-horizontal-share-btn` }
                type="button"
              >
                Compartilhar
              </button>

              {tags.map((tag) => (
                <span
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </DefaultLayout>
  );
}
