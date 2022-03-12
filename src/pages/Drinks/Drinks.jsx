import React, { useContext, useEffect, useState } from 'react';
import { cocktailsAPI, cocktailsListAPI } from '../../services/cocktailsAPI';
import AppContext from '../../context/Context/AppContext';
import { RECIPES_LENGTH, CATEGORIES_LENGTH } from '../../helpers/constants';
import Header from '../../components/Header/Header';
import Recipes from '../../components/Recipes/Recipes';
import ButtonCategories from '../../components/ButtonCategories/ButtonCategories';
import Footer from '../../components/Footer/Footer';

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
      setDrinksList(response.slice(0, CATEGORIES_LENGTH));
    };
    fetchCocktailsList();
    setIsFood(false);
    setSearchRender(true);
  }, [setDrinks, setIsFood, setSearchRender]);

  return (
    <main>
      <Header title="Drinks" />
      <ButtonCategories list={ drinksList } />
      <Recipes data={ drinks || [] } />
      <Footer />
    </main>
  );
}
