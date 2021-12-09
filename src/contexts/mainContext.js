import { createContext } from 'react';

const INITIAL_MAIN_STATE = {
  whatever: 1,
};

const mainContext = createContext(INITIAL_MAIN_STATE);

export default mainContext;
