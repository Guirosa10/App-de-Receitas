import React, { useContext, useEffect, useState } from 'react';
import { cocktailsAPI, cocktailsListAPI } from '../../services/cocktailsAPI';
import AppContext from '../../context/Context/AppContext';
import Header from '../../components/Header/Header';
import Recipes from '../../components/Recipes/Recipes';
import ButtonCategories from '../../components/ButtonCategories/ButtonCategories';
import Footer from '../../components/Footer/Footer';
import { RECIPES_LENGTH } from '../../helpers/constants';
/* eslint-disable react-hooks/exhaustive-deps */
export default function Drinks() {
  const { drinks, setDrinks, setIsFood, setSearchRender } = useContext(AppContext);
  const [drinksList, setDrinksList] = useState([]);

  useEffect(() => {
    const fetchDrinks = async () => {
      const response = await cocktailsAPI();
      setDrinks(response.slice(0, RECIPES_LENGTH));
    };
    fetchDrinks();

    const fetchCocktailsList = async () => {
      const response = await cocktailsListAPI();
      response.length = 5;
      setDrinksList(response);
    };
    fetchCocktailsList();
    setIsFood(false);
    setSearchRender(true);
  }, []);

  return (
    <main>
      <Header title="Drinks" />
      <ButtonCategories list={ drinksList } />
      <Recipes data={ drinks || [] } />
      <Footer />
    </main>
  );
}
