const BASE_MEALS_API_URL = 'https://www.themealdb.com/api/json/v1/1/';
const BASE_DRINKS_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

const RECIPES_BY_INGREDIENT = 'filter.php?i=';
const RECIPES_BY_NAME = 'search.php?s=';
const RECIPES_BY_FIRST_LETTER = 'search.php?f=';

export const getRecipesByIngredient = async (ingredient, recipeType) => {
  let linkToFetch = null;

  if (recipeType === 'meals') linkToFetch = BASE_MEALS_API_URL;
  if (recipeType === 'drinks') linkToFetch = BASE_DRINKS_API_URL;

  const response = await fetch(`${linkToFetch}${RECIPES_BY_INGREDIENT}${ingredient}`);
  const data = await response.json();
  return data[recipeType];
};

export const getRecipesByName = async (name, recipeType) => {
  let linkToFetch = null;

  if (recipeType === 'meals') linkToFetch = BASE_MEALS_API_URL;
  if (recipeType === 'drinks') linkToFetch = BASE_DRINKS_API_URL;

  linkToFetch = `${linkToFetch}${RECIPES_BY_NAME}${name}`;

  const response = await fetch(linkToFetch);
  const data = await response.json();
  return data[recipeType];
};

export const getRecipesByFirstLetter = async (firstLetter, recipeType) => {
  let linkToFetch = null;

  if (recipeType === 'meals') linkToFetch = BASE_MEALS_API_URL;
  if (recipeType === 'drinks') linkToFetch = BASE_DRINKS_API_URL;

  const response = await fetch(`${linkToFetch}${RECIPES_BY_FIRST_LETTER}${firstLetter}`);
  const data = await response.json();
  return data[recipeType];
};
