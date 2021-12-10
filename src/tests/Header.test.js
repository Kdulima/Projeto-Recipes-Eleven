import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import RecipeDetails from '../pages/RecipeDetails';
import DrinkInProgress from '../pages/DrinkInProgress';
import FoodInProgress from '../pages/FoodInProgress';
import Explore from '../pages/Explore';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreArea from '../pages/ExploreArea';
import Profile from '../pages/Profile';
import RecipesMade from '../pages/RecipesMade';
import Favorites from '../pages/Favorites';
// import ExploreMealsByIngred from '../pages/ExploreMealsByIngred';
// import ExploreDrinksByIngred from '../pages/ExploreDrinksByIngred';

afterEach(() => jest.clearAllMocks());

describe(`9 - Implemente os elementos do header na tela principal de receitas,
respeitando os atributos descritos no protótipo`, () => {
  test('Tem os data-testids `profile-top-btn`, `page-title` e `search-top-btn`', () => {
    renderWithRouter(<Foods />);
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByTestId(/search-top-btn/i)).toBeInTheDocument();
    expect(screen.getByTestId(/page-title/i)).toBeInTheDocument();
  });
});

describe(`10 - Implemente um ícone para a tela de perfil, um título e um ícone
para a busca, caso exista no protótipo`, () => {
  test('Não tem header na tela de login', () => {
    const { history } = renderWithRouter(<Foods />);
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
    renderWithRouter(<Foods />);
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByTestId(/search-top-btn/i)).toBeInTheDocument();
    expect(screen.getByText(/Comidas/i)).toBeInTheDocument();
  });

  test(`O header tem os ícones corretos na tela de principal de
  receitas de bebidas`, () => {
    renderWithRouter(<Drinks />);
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByTestId(/search-top-btn/i)).toBeInTheDocument();
    expect(screen.getByText(/Bebidas/i)).toBeInTheDocument();
  });

  test('Não tem header na tela de detalhes de uma receita de comida', () => {
    renderWithRouter(<RecipeDetails />);
    const profileIcon = screen.queryByTestId(/profile-top-btn/i);
    const searchIcon = screen.queryByTestId(/search-top-btn/i);
    expect(profileIcon).not.toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
  });

  test('Não tem header na tela de detalhes de uma receita de bebida', () => {
    renderWithRouter(<RecipeDetails />);
    const profileIcon = screen.queryByTestId(/profile-top-btn/i);
    const searchIcon = screen.queryByTestId(/search-top-btn/i);
    expect(profileIcon).not.toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
  });

  test('Não tem header na tela de receita em processo de comida', () => {
    renderWithRouter(<FoodInProgress/>);
    const profileIcon = screen.queryByTestId(/profile-top-btn/i);
    const searchIcon = screen.queryByTestId(/search-top-btn/i);
    expect(profileIcon).not.toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
  });

  test('Não tem header na tela de receita em processo de bebida', () => {
    renderWithRouter(<DrinkInProgress/>);
    const profileIcon = screen.queryByTestId(/profile-top-btn/i);
    const searchIcon = screen.queryByTestId(/search-top-btn/i);
    expect(profileIcon).not.toBeInTheDocument();
    expect(searchIcon).not.toBeInTheDocument();
  });

  test('O header tem os ícones corretos na tela de explorar', () => {
    renderWithRouter(<Explore />);
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByTestId(/page-title/i)).toBeInTheDocument();
  });

  test('O header tem os ícones corretos na tela de explorar comidas', () => {
    renderWithRouter(<ExploreFoods />);
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByText(/Explorar Comidas/i)).toBeInTheDocument();
  });

  test('O header tem os ícones corretos na tela de explorar bebidas', () => {
    renderWithRouter(<ExploreDrinks />);
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByText(/Explorar Bebidas/i)).toBeInTheDocument();
  });

//   test(`O header tem os ícones corretos na tela de explorar comidas por
//   ingrediente`, () => {
//     renderWithRouter(<##### />);
//     expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
//     expect(screen.getByText(/Explorar Ingredientes/i)).toBeInTheDocument();
//   });

//   test(`O header tem os ícones corretos na tela de explorar bebidas por
//   ingrediente`, () => {
//     renderWithRouter(<ExploreDrinksByIngredients />);
//     expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
//     expect(screen.getByText(/Explorar Ingredientes/i)).toBeInTheDocument();
//   });

  test(`O header tem os ícones corretos na tela de explorar comidas por
  local de origem`, () => {
    renderWithRouter(<ExploreArea />);
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByText(/Origem/i)).toBeInTheDocument();
  });

  test('O header tem os ícones corretos na tela de perfil', () => {
    renderWithRouter(<Profile />);
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByText(/Perfil/i)).toBeInTheDocument();
  });

  test('O header tem os ícones corretos na tela de receitas feitas', () => {
    renderWithRouter(<RecipesMade />);
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByText(/Receitas Feitas/i)).toBeInTheDocument();
  });

  test('O header tem os ícones corretos na tela de receitas favoritas', () => {
    renderWithRouter(<Favorites />);
    expect(screen.getByTestId(/profile-top-btn/i)).toBeInTheDocument();
    expect(screen.getByText(/Receitas Favoritas/i)).toBeInTheDocument();
  });
});

describe(`11 - Redirecione a pessoa usuária para a tela de perfil ao clicar no
botão de perfil`, () => {
  test('A mudança de tela ocorre corretamente', () => {
    const { history } = renderWithRouter(<Foods />);
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
    renderWithRouter(<Foods />);
    const buttonSearch = screen.getByTestId(/search-top-btn/i);
    expect(buttonSearch).toBeInTheDocument();
    fireEvent.click(buttonSearch);
    expect(screen.getByTestId(/search-input/i)).toBeInTheDocument();
  });

  test('Ao clicar no botão de busca pela segunda vez a barra de busca desaparece', () => {
    renderWithRouter(<Foods />);
    const buttonSearch = screen.getByTestId(/search-top-btn/i);
    expect(buttonSearch).toBeInTheDocument();
    fireEvent.click(buttonSearch);
    fireEvent.click(buttonSearch);
    expect(screen.queryByTestId(/search-input/i)).not.toBeInTheDocument();
  });
});

