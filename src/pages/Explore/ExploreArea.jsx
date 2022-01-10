import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import DefaultLayout from '../../components/DefaultLayout';
import { getAreas } from '../../services/recipesAPI';
import RecipesByAreaList from './components/RecipesByAreaList';
import AreasList from './components/AreasList';
import mainContext from '../../contexts/mainContext';

export default function ExploreArea({ history: { location: { pathname } } }) {
  const {
    recipes,
    canTryRedirect,
    idType,
  } = useContext(mainContext);

  const [areas, setAreas] = useState([]);

  useEffect(() => {
    async function fetchAreas() {
      const countries = ['All'];
      const response = await getAreas();
      response.map((area) => countries.push(area.strArea));

      setAreas(countries);
    }
    fetchAreas();
  }, []);

  return (recipes) && (
    <DefaultLayout pathname={ pathname }>
      {(recipes.length === 1 && canTryRedirect) && (
        <Redirect
          to={
            `${recipes[0][`id${idType}`]}`
          }
        />
      )}

      <>
        <AreasList areas={ areas } />
        <RecipesByAreaList />
      </>
    </DefaultLayout>
  );
}

ExploreArea.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
