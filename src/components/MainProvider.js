import React, { useState } from 'react';
import PropTypes from 'prop-types';
import mainContext from '../contexts/mainContext';

export default function MainProvider({ children }) {
  const [pageName, setPageName] = useState('');
  const [categoryToFilter, setCategoryToFilter] = useState('');

  const contextValue = {
    ...mainContext,
    pageName,
    setPageName,
    categoryToFilter,
    setCategoryToFilter,
  };

  return (
    <mainContext.Provider value={ contextValue }>
      {children}
    </mainContext.Provider>
  );
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
