import React, { useState, useEffect } from 'react';
import { mealsAPI, mealsListAPI } from '../../services/api';
import Recipes from '../../components/Recipes/Recipes';
import ButtonCategories from '../../components/ButtonCategories/ButtonCategories';

export default function Foods() {
  const [meals, setMeals] = useState([]);
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
  }, [setMeals, setMealsList]);

  return (
    <main>
      <ButtonCategories list={ mealsList } />
      <Recipes data={ meals } />
    </main>
  );
}
