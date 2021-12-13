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
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    console.log('vousetar');
    if (pathname.includes('comida')) {
      setRecipesType('meals');
      console.log('setei meals');
    }
    if (pathname.includes('bebida')) {
      setRecipesType('drinks');
      console.log('setei drinks');
    }
  }, [pathname, setRecipesType]);

  const routesToHideHeader = [];
  if (routesToHideHeader.includes(pathname)) {
    setIsHeaderVisible(false);
  }

  const routesToHideFooter = ['receitas-feitas', 'receitas-favoritas'];
  if (routesToHideFooter.includes(pathname)) {
    setIsFooterVisible(false);
  }

  return (
    <>
      {isHeaderVisible && <Header pageName={ pageName } />}
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
