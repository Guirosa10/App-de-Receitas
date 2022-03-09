import React, { useState, useEffect } from 'react';
import { cocktailsAPI, cocktailsListAPI } from '../../services/api';
import Recipes from '../../components/Recipes/Recipes';
import ButtonCategories from '../../components/ButtonCategories/ButtonCategories';

export default function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const [drinksList, setDrinksList] = useState([]);

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
  }, [setDrinks, setDrinksList]);

  return (
    <main>
      <ButtonCategories list={ drinksList } />
      <Recipes data={ drinks } />
    </main>
  );
}
