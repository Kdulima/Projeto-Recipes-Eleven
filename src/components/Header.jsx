import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    <header>
      <div>
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="Profile Icon"
            data-testid="profile-top-btn"
          />
        </Link>

        <span data-testid="page-title">{treatedPageName}</span>

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
      </div>

      <HeaderSearchBar isVisible={ isSearchBarVisible } />
    </header>
  );
}
