import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import '../styles/Footer.css';
import '../styles/Header.css';
import Header from './Header';
import { treatPathname } from '../helpers';
import mainContext from '../contexts/mainContext';

export default function DefaultLayout({ children, pathname = '', hideAll }) {
  const pageName = treatPathname(pathname);
  const { setRecipesType, setIdType } = useContext(mainContext);

  const [isFooterVisible, setIsFooterVisible] = useState(true);

  useEffect(() => {
    if (pathname.includes('comida')) {
      setRecipesType('meals');
      setIdType('Meal');
    }
    if (pathname.includes('bebida')) {
      setRecipesType('drinks');
      setIdType('Drink');
    }

    const routesToHideFooter = [
      'Receitas Feitas',
      'Receitas Favoritas',
    ];

    if (routesToHideFooter.includes(pageName)) {
      setIsFooterVisible(false);
    }
  }, [pathname, setRecipesType, setIdType, pageName]);

  return (
    <>
      {!hideAll && <Header pageName={ pageName } />}
      <main>
        {children}
      </main>
      {isFooterVisible && !hideAll && <Footer />}
    </>
  );
}

DefaultLayout.defaultProps = {
  hideAll: false,
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string.isRequired,
  hideAll: PropTypes.bool,
};
