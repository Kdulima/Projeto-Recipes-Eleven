import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import '../styles/Footer.css';
import Header from './Header';
import { getPageName } from '../helpers';
import mainContext from '../contexts/mainContext';

export default function DefaultLayout({ children, pathname }) {
  const { setPageName } = useContext(mainContext);

  useEffect(() => {
    getPageName(pathname, setPageName);
  }, [pathname, setPageName]);

  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string.isRequired,
};
