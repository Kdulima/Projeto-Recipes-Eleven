import React from 'react';
import PropTypes from 'prop-types';
import mainContext from '../contexts/mainContext';

export default function MainProvider({ children }) {
  return (
    <mainContext.Provider value={ mainContext }>
      {children}
    </mainContext.Provider>
  );
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
