export const mealsAPI = async () => {
  const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s')
    .then((results) => results.json());
  return meals;
};

export const cocktailsAPI = async () => {
  const { drinks } = await fetch('www.thecocktaildb.com/api/json/v1/1/search.php?s')
    .then((results) => results.json());
  return drinks;
};
