import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
    console.log(password);
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
    <form onSubmit={ handleLogin }>
      <label htmlFor="email">
        Email
        <input
          type="email"
          id="email"
          name="email"
          value={ email }
          data-testid="email-input"
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          type="password"
          id="password"
          name="password"
          value={ password }
          data-testid="password-input"
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>
      <Button
        as="input"
        type="submit"
        value="Entrar"
        disabled={ isButtonDisabled }
        data-testid="login-submit-btn"
      />
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
