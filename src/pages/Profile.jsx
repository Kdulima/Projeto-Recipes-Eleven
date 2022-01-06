import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import DefaultLayout from '../components/DefaultLayout';

export default function Profile({ history }) {
  const [user, setUser] = useState('');

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    setUser(email);
  }, []);

  return (
    <div>
      <DefaultLayout pathname="/perfil">
        <Header title="Perfil" />
        Perfil
        <p data-testid="profile-email">{user}</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Sair
        </button>
        <Footer />
      </DefaultLayout>
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
