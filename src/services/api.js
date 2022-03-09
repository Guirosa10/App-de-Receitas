export const mealsAPI = async () => {
  const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((results) => results.json());
  return meals;
};

export const cocktailsAPI = async () => {
  const { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then((results) => results.json());
  return drinks;
};

export const mealsListAPI = async () => {
  const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((results) => results.json());
  return meals;
};

export const cocktailsListAPI = async () => {
  const { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((results) => results.json());
  return drinks;
};

export const mealsCategoriesAPI = async (category) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const { meals } = await fetch(URL)
    .then((results) => results.json());
  return meals;
};

export const cocktailsCategoriesAPI = async (category) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const { drinks } = await fetch(URL)
    .then((results) => results.json());
  return drinks;
};
