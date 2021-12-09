import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import '../styles/Footer.css';

export default function LayoutDefault({ children }) {
  return (
    <>
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}

LayoutDefault.propTypes = {
  children: PropTypes.node.isRequired,
};
