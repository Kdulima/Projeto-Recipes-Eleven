import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import '../styles/Footer.css';
import '../styles/Header.css';
import Header from './Header';
import { getPageName } from '../helpers';
import mainContext from '../contexts/mainContext';

export default function DefaultLayout({ children, pathname = '' }) {
  const { setPageName, setRecipesType } = useContext(mainContext);
  const [isFooterVisible, setIsFooterVisible] = useState(true);

  useEffect(() => {
    getPageName(pathname, setPageName);

    if (pathname.includes('comida')) {
      setRecipesType('meals');
    }

    if (pathname.includes('bebida')) {
      setRecipesType('drinks');
    }

    const routesToHideFooter = ['receitas-feitas', 'receitas-favoritas'];
    if (routesToHideFooter.includes(pathname)) {
      setIsFooterVisible(false);
    }
  }, [pathname, setPageName, setRecipesType]);

  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      {(isFooterVisible) && <Footer />}
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string.isRequired,
};
