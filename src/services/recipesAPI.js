const BASE_MEALS_API_URL = 'https://www.themealdb.com/api/json/v1/1/';
const BASE_DRINKS_API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

const RECIPES_BY_INGREDIENT = 'filter.php?i=';
const RECIPES_BY_NAME = 'search.php?s=';
const RECIPES_BY_FIRST_LETTER = 'search.php?f=';
const RECIPES_BY_CATEGORY = 'filter.php?c=';
const RECIPES_DETAIL_BY_ID = 'lookup.php?i=';
const RECIPES_CATEGORIES = 'list.php?c=list';
const RANDOM_RECIPE = 'random.php';

const setLinkToFetch = (recipeType) => {
  let linkToFetch = null;

  if (recipeType === 'meals') linkToFetch = BASE_MEALS_API_URL;
  if (recipeType === 'drinks') linkToFetch = BASE_DRINKS_API_URL;

  return linkToFetch;
};

const getApiData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const getRecipesByIngredient = async (ingredient, recipeType) => {
  const linkToFetch = setLinkToFetch(recipeType);
  const data = await getApiData(`${linkToFetch}${RECIPES_BY_INGREDIENT}${ingredient}`);

  return data[recipeType];
};

export const getRecipesByName = async (name, recipeType) => {
  const linkToFetch = setLinkToFetch(recipeType);

  const data = await getApiData(`${linkToFetch}${RECIPES_BY_NAME}${name}`);
  return data[recipeType];
};

export const getRecipesByFirstLetter = async (firstLetter, recipeType) => {
  const linkToFetch = setLinkToFetch(recipeType);

  const data = await getApiData(`${linkToFetch}${RECIPES_BY_FIRST_LETTER}${firstLetter}`);
  return data[recipeType];
};

export const getRecipesByCategory = async (category = 'cocktail', recipeType) => {
  try {
    const linkToFetch = setLinkToFetch(recipeType);

    const data = await getApiData(`${linkToFetch}${RECIPES_BY_CATEGORY}${category}`);
    return data[recipeType];
  } catch (err) {
    return undefined;
  }
};

export const getRecipeDetails = async (recipeId, recipeType) => {
  const linkToFetch = setLinkToFetch(recipeType);
  const data = await getApiData(`${linkToFetch}${RECIPES_DETAIL_BY_ID}${recipeId}`);

  if (data[recipeType]) {
    return data[recipeType];
  }

  return [{}];
};

export const getRecipeCategories = async (recipeType) => {
  const linkToFetch = setLinkToFetch(recipeType);
  const data = await getApiData(`${linkToFetch}${RECIPES_CATEGORIES}`);

  return data[recipeType];
};

export const getRandomRecipeId = async (recipeType) => {
  const type = recipeType === 'comidas'
    ? { id: 'idMeal', name: 'meals' }
    : { id: 'idDrink', name: 'drinks' };

  const linkToFetch = setLinkToFetch(type.name);
  const data = await getApiData(`${linkToFetch}${RANDOM_RECIPE}`);

  return data[type.name][0][type.id];
};
