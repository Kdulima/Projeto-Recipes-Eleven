import React from 'react';
import PropTypes from 'prop-types';
import DefaultLayout from '../components/DefaultLayout';

export default function Ingredients({ location }) {
  return (
    <DefaultLayout pathname={ location.pathname }>
      <h1>Drinks</h1>
    </DefaultLayout>
  );
}

Ingredients.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
