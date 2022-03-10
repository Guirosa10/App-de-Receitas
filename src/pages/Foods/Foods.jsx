/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { mealsAPI, mealsListAPI } from '../../services/mealsAPI';
import AppContext from '../../context/Context/AppContext';
import Header from '../../components/Header/Header';
import Recipes from '../../components/Recipes/Recipes';
import ButtonCategories from '../../components/ButtonCategories/ButtonCategories';

export default function Foods() {
  const { meals, setMeals, setIsFood } = useContext(AppContext);
  const [mealsList, setMealsList] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await mealsAPI();
      response.length = 12;
      setMeals(response);
    };
    fetchMeals();

    const fetchMealsList = async () => {
      const response = await mealsListAPI();
      response.length = 5;
      setMealsList(response);
    };
    fetchMealsList();
    setIsFood(true);
  }, [setMeals, setIsFood]);

  return (
    <main>
      <Header title="Foods" />
      <ButtonCategories list={ mealsList } />
      <Recipes data={ meals } />
    </main>
  );
}
