import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Tela de login', () => {
  let emailInput = null;
  let passwordInput = null;
  let loginSubmitBtn = null;
  let globalHistory = {};
  const validEmail = 'email@mail.com';

  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    globalHistory = history;
    emailInput = screen.getByTestId('email-input');
    passwordInput = screen.getByTestId('password-input');
    loginSubmitBtn = screen.getByTestId('login-submit-btn');
  });

  it('2 - Crie os lementos descritos no protótipo para a tela de login', () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginSubmitBtn).toBeInTheDocument();
  });

  it('3 - A pessoa deve conseguir escrever o email no input de email', () => {
    userEvent.type(emailInput, validEmail);

    expect(emailInput).toHaveValue(validEmail);
  });

  it('4 - A pessoa deve conseguir escrever a senha no input de senha', () => {
    const expectText = '1234567';
    userEvent.type(passwordInput, expectText);

    expect(passwordInput).toHaveValue(expectText);
  });

  describe('5 - O formulário deve ser válido apenas com inputs válidos', () => {
    it('O botão é desativado se o email for inválido', () => {
      expect(loginSubmitBtn.disabled).toBe(true);

      userEvent.type(emailInput, 'email@mail');
      userEvent.type(passwordInput, '1234567');
      expect(loginSubmitBtn.disabled).toBe(true);

      userEvent.type(emailInput, 'email.com');
      expect(loginSubmitBtn.disabled).toBe(true);
    });

    it('O botão é desativado se a senha tiver 6 caracteres ou menos', () => {
      expect(loginSubmitBtn.disabled).toBe(true);

      userEvent.type(emailInput, validEmail);
      userEvent.type(passwordInput, '123456');

      expect(loginSubmitBtn.disabled).toBe(true);
    });

    it('O botão deve estar ativado se a senha e o email forem validos', () => {
      expect(loginSubmitBtn.disabled).toBe(true);

      userEvent.type(emailInput, 'email@mail.com');
      userEvent.type(passwordInput, '1234567');

      expect(loginSubmitBtn.disabled).toBe(false);
    });
  });

  it('6 - Salve mealsToken e cocktailsToken no localStorage após a submissão', () => {
    expect(loginSubmitBtn.disabled).toBe(true);

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginSubmitBtn);

    const storageMeal = localStorage.getItem('mealsToken');
    const storageCocktails = localStorage.getItem('cocktailsToken');

    expect(storageMeal).toBe('1');
    expect(storageCocktails).toBe('1');
  });

  it('7 - Salve o e-mail no localStorage na chave user, após a submissão', () => {
    expect(loginSubmitBtn.disabled).toBe(true);

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginSubmitBtn);

    const user = localStorage.getItem('user');
    const { email } = JSON.parse(user);

    expect(email).toBe(validEmail);
  });

  it('8 - Manda para a tela principal de receitas de comida após submissão', () => {
    expect(loginSubmitBtn.disabled).toBe(true);

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginSubmitBtn);

    const { location } = globalHistory;
    expect(location.pathname).toBe('/comidas');
  });
});
