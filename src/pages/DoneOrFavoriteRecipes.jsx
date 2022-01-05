import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import mainContext from '../contexts/mainContext';
import shareIcon from '../images/shareIcon.svg';
import DefaultLayout from '../components/DefaultLayout';
import FavoriteBtn from '../components/FavoriteBtn';

export default function DoneRecipes({ history, location }) {
  const { doneRecipes, favoriteRecipes, isMounted } = useContext(mainContext);

  const [recipesToShow, setRecipesToShow] = useState([]);
  const [showShareMessage, setShowShareMessage] = useState(false);
  const [isInDonePage, setIsInDonePage] = useState(true);
  const pageName = isInDonePage ? 'feitas' : 'favoritas';

  useEffect(() => {
    if (location.pathname.includes('receitas-favoritas')) {
      setIsInDonePage(false);
      return setRecipesToShow(favoriteRecipes);
    }
    setRecipesToShow(doneRecipes);
  }, [doneRecipes, favoriteRecipes, location.pathname]);

  async function copyRecipeDetailUrl(id, type) {
    const baseURL = document.URL.split(`receitas-${pageName}`)[0];

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${baseURL}${type}s/${id}`);
      setShowShareMessage(true);
    }
  }

  function handleCopyMessage() {
    const TIMER = 2000;

    setTimeout(() => setShowShareMessage(false), TIMER);
    // Sugestão é esse span aparecer com um position absolute em algum canto da tela
    return <span>Link copiado!</span>;
  }

  function handleFilter({ target }) {
    const baseList = isInDonePage ? doneRecipes : favoriteRecipes;

    if (target.name) {
      return setRecipesToShow(baseList
        .filter(({ type }) => type === target.name));
    }
    setRecipesToShow(baseList);
  }

  return isMounted && (
    <DefaultLayout pathname={ `/receitas-${pageName}` }>
      {showShareMessage && handleCopyMessage()}
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ handleFilter }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          name="comida"
          onClick={ handleFilter }
        >
          Foods
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          name="bebida"
          onClick={ handleFilter }
        >
          Drinks
        </button>
      </div>

      <div>
        {recipesToShow.map((recipe, index) => {
          const {
            id, type, image, name, area, category, doneDate, tags, alcoholicOrNot,
          } = recipe;
          return (
            <div key={ id }>
              <button
                type="button"
                onClick={ () => history.push(`/${type}s/${id}`) }
              >
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ image }
                  alt={ name }
                  width="200"
                />
              </button>

              <Link to={ `/${type}s/${id}` }>
                <p data-testid={ `${index}-horizontal-name` }>{name}</p>
              </Link>

              <p data-testid={ `${index}-horizontal-top-text` }>
                {area && `${area} - `}
                {category}
                {alcoholicOrNot && ' - Alcoholic'}
              </p>

              {isInDonePage && (
                <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
              )}

              {/* O teste verifica o src do botão */}
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                type="button"
                onClick={ () => copyRecipeDetailUrl(id, type) }
              >
                <img src={ shareIcon } alt="Share Icon" />
              </button>

              <FavoriteBtn
                idURL={ id }
                testid={ `${index}-horizontal-favorite-btn` }
                recipe={ recipe }
              />

              {isInDonePage && tags.map((tag) => (
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

DoneRecipes.propTypes = ({
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
});
