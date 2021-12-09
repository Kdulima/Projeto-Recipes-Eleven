import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import mainContext from '../contexts/mainContext';

import { getPageName } from '../helpers';
import Header from '../components/Header';

export default function WithHeader({ location }) {
  const { setPageName } = useContext(mainContext);

  // Pega o nome da pagina na URL e lança no contexto
  useEffect(() => {
    getPageName(location.pathname, setPageName);
  }, [location.pathname, setPageName]);

  return (
    <Header />
  );
}

WithHeader.propTypes = ({
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
});
