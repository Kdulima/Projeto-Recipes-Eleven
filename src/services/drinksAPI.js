const ingrediente = 'orange';
const nome = 'latte';
const primeiraLetra = 'a';

const DRINKS_BY_INGREDIENT = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
const DRINKS_BY_NAME = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`;
const DRINKS_BY_FIRST_LETTER = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`;

export const getDrinksByIngredient = async (/* ingredient */) => {
  const response = await fetch(DRINKS_BY_INGREDIENT);
  const data = await response.json();
  return data.drinks;
};

export const getDrinksByName = async (/* name */) => {
  const response = await fetch(DRINKS_BY_NAME);
  const data = await response.json();
  return data.drinks;
};

export const getDrinksByFirstLetter = async (/* firstLetter */) => {
  const response = await fetch(DRINKS_BY_FIRST_LETTER);
  const data = await response.json();
  return data.drinks;
};
