import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import HeaderSearchBar from './HeaderSearchBar';

const pagesCanShowSearch = [
  'Comidas', 'Bebidas', 'Explorar Origem', 'Explorar Origem',
];
export default function Header({ pageName }) {
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Lida com nome da pagina e visibilidade dos icones
  useEffect(() => {
    if (!isMounted) {
      const canShowSearch = pagesCanShowSearch.includes(pageName);
      setIsSearchVisible(canShowSearch);
      setIsMounted(true);
    }
  }, [isMounted, pageName]);

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
          <h2 data-testid="page-title" className="header-title">{pageName}</h2>
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

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
};
