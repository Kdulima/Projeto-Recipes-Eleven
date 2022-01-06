import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/Login.css';
import { Container, Row } from 'react-bootstrap';

const validateEmail = (email) => {
  // Regex retirado do site: https://regexr.com
  const regex = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi;
  const isValid = email.match(regex);
  if (isValid) return true;
  return false;
};

const validatePassword = (password) => {
  const MIN_PASSWORD_LENGTH = 6;
  if (password.length > MIN_PASSWORD_LENGTH) {
    return true;
  }
  return false;
};

export default function Login({ history }) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (isEmailValid && isPasswordValid) {
      setIsButtonDisabled(false);
    } else setIsButtonDisabled(true);
  }, [email, password]);

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  };

  return (
    <>
      <header className="login-header">
        <h1>Login</h1>
      </header>
      <Container fluid className="form">
        <form onSubmit={ handleLogin }>
          <Row className="flex">
            <input
              className="input"
              type="email"
              id="email"
              name="email"
              value={ email }
              data-testid="email-input"
              placeholder="Email"
              onChange={ (e) => setEmail(e.target.value) }
            />
          </Row>
          <Row>
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              value={ password }
              data-testid="password-input"
              placeholder="Senha"
              onChange={ (e) => setPassword(e.target.value) }
            />
          </Row>
          <Row>
            <Button
              className="button"
              as="input"
              type="submit"
              value="Entrar"
              disabled={ isButtonDisabled }
              data-testid="login-submit-btn"
            />
          </Row>
        </form>
      </Container>
    </>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
