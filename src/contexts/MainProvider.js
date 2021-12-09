import React, { useState } from 'react';
import PropTypes from 'prop-types';
import mainContext from './mainContext';

export default function MainProvider({ children }) {
  const [pageName, setPageName] = useState('');

  const contextValue = {
    pageName,
    setPageName,
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
