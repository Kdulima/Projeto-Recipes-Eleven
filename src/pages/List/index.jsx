import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import DefaultLayout from '../../components/DefaultLayout';
import RecipesList from './components/RecipesList';
import CategoryFilters from './components/CategoryFilters';
import mainContext from '../../contexts/mainContext';

export default function List({ history: { location: { pathname } } }) {
  const {
    recipes,
    recipesType,
    showAlert,
    setShowAlert,
    canRedirect,
    setIsMounted,
  } = useContext(mainContext);

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted, recipesType]);

  useEffect(() => {
    if (showAlert) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      setShowAlert(false);
    }
  }, [showAlert, setShowAlert]);

  return (recipes) && (
    <DefaultLayout pathname={ pathname }>
      {(recipes.length === 1 && canRedirect) && (
        <Redirect
          to={
            `${pathname}/${recipes[0][`id${recipesType === 'meals' ? 'Meal' : 'Drink'}`]}`
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
