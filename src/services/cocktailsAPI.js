export default cocktailsAPI = async () => {
  const { drinks } = await fetch('www.thecocktaildb.com/api/json/v1/1/search.php?s')
    .then((results) => results.json());
  return drinks;
};
