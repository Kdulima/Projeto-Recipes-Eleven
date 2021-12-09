import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import mainContext from '../contexts/mainContext';

// Função que altera o nome da página no contexto
import { getPageName } from '../helpers';
import Header from '../components/Header';

// Pegar o location para mandar para getPageName
export default function WithHeader({ location }) {
  // Copiar esse acesso ao contexto
  const { setPageName } = useContext(mainContext);

  // Pega o nome da pagina atual na URL e lança no contexto
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
