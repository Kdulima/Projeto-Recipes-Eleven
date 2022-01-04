import React, { useContext, useState, useEffect } from 'react';

import mainContext from '../contexts/mainContext';
import shareIcon from '../images/shareIcon.svg';
import DefaultLayout from '../components/DefaultLayout';

export default function DoneRecipes() {
  const { doneRecipes, isMounted } = useContext(mainContext);
  const [recipesToShow, setRecipesToShow] = useState(doneRecipes);

  useEffect(() => setRecipesToShow(doneRecipes), [doneRecipes]);

  return isMounted && (
    <DefaultLayout pathname="/receitas-feitas">
      {console.log(recipesToShow)}
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
        {recipesToShow.map((recipe, index) => {
          const {
            image, name, area, category, doneDate, tags, alcoholicOrNot,
          } = recipe;
          return (
            <div key={ index }>
              <img
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-top-text` }>
                {area && `${area} - `}
                {category}
                {alcoholicOrNot && ' - Alcoholic'}
              </p>
              <p data-testid={ `${index}-horizontal-name` }>{name}</p>
              <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>

              {/* O teste verifica o src do botão */}
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                type="button"
              >
                <img src={ shareIcon } alt="Share Icon" />
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
