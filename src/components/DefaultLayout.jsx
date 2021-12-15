import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import '../styles/Footer.css';
import '../styles/Header.css';
import Header from './Header';
import { treatPathname } from '../helpers';
import mainContext from '../contexts/mainContext';

export default function DefaultLayout({ children, pathname = '' }) {
  const pageName = treatPathname(pathname);
  const { setRecipesType } = useContext(mainContext);

  const [isFooterVisible, setIsFooterVisible] = useState(true);

  useEffect(() => {
    if (pathname.includes('comida')) {
      setRecipesType('meals');
    }
    if (pathname.includes('bebida')) {
      setRecipesType('drinks');
    }

    const routesToHideFooter = [
      'Receitas Feitas',
      'Receitas Favoritas',
    ];

    if (routesToHideFooter.includes(pageName)) {
      setIsFooterVisible(false);
    }
  }, [pathname, setRecipesType, pageName]);

  return (
    <>
      <Header pageName={ pageName } />
      <main>
        {children}
      </main>
      {isFooterVisible && <Footer />}
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string.isRequired,
};
