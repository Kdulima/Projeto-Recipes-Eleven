const ingrediente = 'chicken';
const nome = 'stew';
const primeiraLetra = 'a';

const FOODS_BY_INGREDIENT = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
const FOODS_BY_NAME = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;
const FOODS_BY_FIRST_LETTER = `https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`;

export const getFoodsByIngredient = async (/* ingredient */) => {
  const response = await fetch(FOODS_BY_INGREDIENT);
  const data = await response.json();
  return data.meals;
};

export const getFoodsByName = async (/* name */) => {
  const response = await fetch(FOODS_BY_NAME);
  const data = await response.json();
  return data.meals;
};

export const getFoodsByFirstLetter = async (/* firstLetter */) => {
  const response = await fetch(FOODS_BY_FIRST_LETTER);
  const data = await response.json();
  return data.meals;
};
