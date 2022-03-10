import React, { useContext, useEffect, useState } from 'react';
import { cocktailsAPI, cocktailsListAPI } from '../../services/cocktailsAPI';
import AppContext from '../../context/Context/AppContext';
import Recipes from '../../components/Recipes/Recipes';
import ButtonCategories from '../../components/ButtonCategories/ButtonCategories';
import Header from '../../components/Header/Header';

export default function Drinks() {
  const { drinks, setDrinks, setIsFood } = useContext(AppContext);
  const [drinksList, setDrinksList] = useState([]);
  const { setSearchRender } = useContext(AppContext);

  useEffect(() => {
    setSearchRender(true);
  }, [setSearchRender]);

  useEffect(() => {
    const fetchDrinks = async () => {
      const response = await cocktailsAPI();
      response.length = 12;
      setDrinks(response);
    };
    fetchDrinks();

    const fetchCocktailsList = async () => {
      const response = await cocktailsListAPI();
      response.length = 5;
      setDrinksList(response);
    };
    fetchCocktailsList();
    setIsFood(false);
  }, [setDrinks, setIsFood]);

  return (
    <main>
      <Header title="Drinks" />
      <ButtonCategories list={ drinksList } />
      <Recipes data={ drinks } />
    </main>
  );
}
