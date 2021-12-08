import React from 'react';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  return (
    <header>
      <div>
        <img
          src={ profileIcon }
          alt="Profile Icon"
          data-testid="profile-top-btn"
        />
        <span data-testid="page-title">Comidas</span>
        <img
          src={ searchIcon }
          alt="Serch Icon"
          data-testid="search-top-btn"
        />
      </div>
      <input type="text" data-testid="search-input" />
    </header>
  );
}
