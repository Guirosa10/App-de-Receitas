/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/Context/AppContext';
import { mealsIdAPI } from '../../services/mealsAPI';

export default function FoodDetails() {
  const { meals, setMeals } = useContext(AppContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchMealsId = async () => {
      const response = await mealsIdAPI(id);
      setMeals(response);
    };
    fetchMealsId();
    console.log(meals);
  }, []);

  return (
    <main>
      <div>FoodDetails</div>
      {
        meals && meals.map((meal) => (
          <img src={ meal.strMealThumb } key={ meal.idMeal } alt={ meal.idMeal } />
        ))
      }
    </main>
  );
}
