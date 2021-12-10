import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { capitalize, handleHeaderName } from '../helpers';
import mainContext from '../contexts/mainContext';
import HeaderSearchBar from './HeaderSearchBar';

export default function Header() {
  const { pageName } = useContext(mainContext);
  const [treatedPageName, setTreatedPageName] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  // Lida com nome da pagina e visibilidade dos icones
  useEffect(() => {
    const pagesCanShowSearch = [
      'Comidas', 'Bebidas', 'Explorar Origem', 'Explorar Origem',
    ];

    const capitalizePageName = handleHeaderName(pageName)
      .split(' ')
      .map((letters) => capitalize(letters))
      .join(' ');

    const canShowSearch = pagesCanShowSearch.includes(capitalizePageName);

    setIsSearchVisible(canShowSearch);
    setTreatedPageName(capitalizePageName);
  }, [pageName]);

  return (
    <Container as="header" fluid className="header pt-2 pb-2">
      <Row className="align-items-center">
        <Col className="text-center">
          <Link to="/perfil">
            <img
              src={ profileIcon }
              alt="Profile Icon"
              data-testid="profile-top-btn"
            />
          </Link>
        </Col>
        <Col xs lg={ 8 } className="text-center">
          <h2 data-testid="page-title" className="header-title">{treatedPageName}</h2>
        </Col>
        <Col className="text-center">
          {(isSearchVisible) && (
            <button
              type="button"
              onClick={ () => setIsSearchBarVisible((prevState) => !prevState) }
            >
              <img
                src={ searchIcon }
                alt="Serch Icon"
                data-testid="search-top-btn"
              />
            </button>
          )}
        </Col>
      </Row>
      <Row>
        <HeaderSearchBar isVisible={ isSearchBarVisible } />
      </Row>
    </Container>
  );
}
