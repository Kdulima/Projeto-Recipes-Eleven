import React, { useContext, useEffect, useState } from 'react';
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
    setRecipesBy,
    showAlert,
    setShowAlert,
  } = useContext(mainContext);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (showAlert) {
      global.alert('Sinto muito, não encontramos nenhuma receita para essses filtros.');
      setShowAlert(false);
    }
  }, [showAlert, setShowAlert]);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted, setRecipesBy, recipesType]);

  return (recipes) && (
    <DefaultLayout pathname={ pathname }>
      {/* {console.log(recipes)} */}
      {recipes.length === 1 && (
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
