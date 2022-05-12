import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import DefaultLayout from '../components/DefaultLayout';
import './style/Profile.css';
import mainContext from '../contexts/mainContext';

export default function Profile({ history }) {
  const [user, setUser] = useState('');
  const { isMounted } = useContext(mainContext);

  useEffect(() => {
    const userOne = JSON.parse(localStorage.getItem('user'));
    if (userOne) {
      setUser(userOne.email);
    }
  }, []);

  return isMounted && (
    <DefaultLayout pathname="/perfil">
      <p data-testid="profile-email">{user}</p>
      <Button
        variant="outline-danger"
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Receitas Feitas
      </Button>
      <Button
        variant="outline-danger"
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/receitas-favoritas') }
      >
        Receitas Favoritas
      </Button>
      <Button
        variant="outline-danger"
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Sair
      </Button>
    </DefaultLayout>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
