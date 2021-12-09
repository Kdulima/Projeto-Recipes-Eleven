import React, { useState } from 'react';
import PropTypes from 'prop-types';
import mainContext from '../contexts/mainContext';

export default function MainProvider({ children }) {
  const [categoryToFilter, setCategoryToFilter] = useState('');
  return (
    <mainContext.Provider value={ { categoryToFilter, setCategoryToFilter } }>
      {children}
    </mainContext.Provider>
  );
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
