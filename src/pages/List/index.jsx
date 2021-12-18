import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import DefaultLayout from '../../components/DefaultLayout';
import RecipesList from './components/RecipesList';
import CategoryFilters from './components/CategoryFilters';
import mainContext from '../../contexts/mainContext';

export default function List({ history: { location: { pathname } } }) {
  const {
    recipes,
    canTryRedirect,
    idType,
  } = useContext(mainContext);

  return (recipes) && (
    <DefaultLayout pathname={ pathname }>
      {(recipes.length === 1 && canTryRedirect) && (
        <Redirect
          to={
            `${pathname}/${recipes[0][`id${idType}`]}`
          }
        />
      )}

      {recipes.length > 0 && (
        <>
          <CategoryFilters />
          <RecipesList />
        </>
      )}
    </DefaultLayout>
  );
}

List.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
