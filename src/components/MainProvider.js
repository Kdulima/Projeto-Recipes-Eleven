import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const INITIAL_MAIN_STATE = {
  whatever: 1,
};
export const mainContext = createContext(INITIAL_MAIN_STATE);

export function MainProvider({ children }) {
  return (
    <mainContext.Provider value={ mainContext }>
      {children}
    </mainContext.Provider>
  );
}

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
