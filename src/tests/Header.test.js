import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

afterEach(() => jest.clearAllMocks());

describe(`9 - Implemente os elementos do header na tela principal de receitas,
respeitando os atributos descritos no protótipo`, () => {
  test('Tem os data-testids `profile-top-btn`, `page-title` e `search-top-btn`', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByTestId(/search-top-btn/i)).toBeInTheDocument();
    expect(screen.getByTestId(/page-title/i)).toBeInTheDocument();
  });
});

describe(`10 - Implemente um ícone para a tela de perfil, um título e um ícone
para a busca, caso exista no protótipo`, () => {
  test('Não tem header na tela de login', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    const profileIcon = screen.getByTestId(/profile-top-btn/i);
    expect(profileIcon).toBeInTheDocument();
    const headerTitle = screen.getByTestId(/page-title/i);
    expect(headerTitle).toBeInTheDocument();
    const searchIcon = screen.getByTestId(/search-top-btn/i);
    expect(searchIcon).toBeInTheDocument();
    history.push('/');
    expect(pathname).toBe('/');
    expect('/').not.toContain(profileIcon);
    expect('/').not.toContain(headerTitle);
    expect('/').not.toContain(searchIcon);
  });

  test(`O header tem os ícones corretos na tela de principal de
  receitas de comidas`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByTestId(/search-top-btn/i)).toBeInTheDocument();
    expect(screen.getByText(/Comidas/i)).toBeInTheDocument();
  });

  test(`O header tem os ícones corretos na tela de principal de
  receitas de bebidas`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas');
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByTestId(/search-top-btn/i)).toBeInTheDocument();
    expect(screen.getByText(/Bebidas/i)).toBeInTheDocument();
  });

  test('Não tem header na tela de detalhes de uma receita de comida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas/:id');
    const profileIcon = screen.queryByTestId(/profile-top-btn/i);
    const searchIcon = screen.queryByTestId(/search-top-btn/i);
    expect(profileIcon).not.toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
  });

  test('Não tem header na tela de detalhes de uma receita de bebida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas/:id');
    const profileIcon = screen.queryByTestId(/profile-top-btn/i);
    const searchIcon = screen.queryByTestId(/search-top-btn/i);
    expect(profileIcon).not.toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
  });

  test('Não tem header na tela de receita em processo de comida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('comidas/:id/in-progress');
    const profileIcon = screen.queryByTestId(/profile-top-btn/i);
    const searchIcon = screen.queryByTestId(/search-top-btn/i);
    expect(profileIcon).not.toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
  });

  test('Não tem header na tela de receita em processo de bebida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('bebidas/:id/in-progress');
    const profileIcon = screen.queryByTestId(/profile-top-btn/i);
    const searchIcon = screen.queryByTestId(/search-top-btn/i);
    expect(profileIcon).not.toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
  });

  test('O header tem os ícones corretos na tela de explorar', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar');
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByTestId(/page-title/i)).toBeInTheDocument();
  });

  test('O header tem os ícones corretos na tela de explorar comidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/comidas');
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByText(/Explorar Comidas/i)).toBeInTheDocument();
  });

  test('O header tem os ícones corretos na tela de explorar bebidas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas');
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByText(/Explorar Bebidas/i)).toBeInTheDocument();
  });

  test(`O header tem os ícones corretos na tela de explorar comidas por
  ingrediente`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/comidas/ingredientes');
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByText(/Explorar Ingredientes/i)).toBeInTheDocument();
  });

  test(`O header tem os ícones corretos na tela de explorar bebidas por
  ingrediente`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas/ingredientes');
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByText(/Explorar Ingredientes/i)).toBeInTheDocument();
  });

  test(`O header tem os ícones corretos na tela de explorar comidas por
  local de origem`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/comidas/area');
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByText(/Origem/i)).toBeInTheDocument();
  });

  test('O header tem os ícones corretos na tela de perfil', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByText(/Perfil/i)).toBeInTheDocument();
  });

  test('O header tem os ícones corretos na tela de receitas feitas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/receitas-feitas');
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByText(/Receitas Feitas/i)).toBeInTheDocument();
  });

  test('O header tem os ícones corretos na tela de receitas favoritas', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/receitas-favoritas');
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByText(/Receitas Favoritas/i)).toBeInTheDocument();
  });
});

describe(`11 - Redirecione a pessoa usuária para a tela de perfil ao clicar no
botão de perfil`, () => {
  test('A mudança de tela ocorre corretamente', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    const buttonProfile = screen.getByTestId(/profile-top-btn/i);
    expect(buttonProfile).toBeInTheDocument();
    fireEvent.click(buttonProfile);
    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });
});

describe(`12 - Desenvolva o botão de busca que, ao ser clicado, a barra de
busca deve aparecer. O mesmo serve para escondê-la`, () => {
  test('Ao clicar no botão de busca pela primeira vez a barra de busca aparece', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    const buttonSearch = screen.getByTestId(/search-top-btn/i);
    expect(buttonSearch).toBeInTheDocument();
    fireEvent.click(buttonSearch);
    expect(screen.getByTestId(/search-input/i)).toBeInTheDocument();
  });

  test('Ao clicar no botão de busca pela segunda vez a barra de busca desaparece', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    const buttonSearch = screen.getByTestId(/search-top-btn/i);
    expect(buttonSearch).toBeInTheDocument();
    fireEvent.click(buttonSearch);
    fireEvent.click(buttonSearch);
    expect(screen.queryByTestId(/search-input/i)).not.toBeInTheDocument();
  });
});
