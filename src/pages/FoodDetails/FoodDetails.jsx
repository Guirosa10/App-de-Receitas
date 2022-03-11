/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Ingredients from '../../components/Ingredients/Ingredients';
import AppContext from '../../context/Context/AppContext';
import { mealsIdAPI } from '../../services/mealsAPI';

export default function FoodDetails() {
  const { meals, setMeals } = useContext(AppContext);
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const filterIngredientsFunction = (array) => {
    const keys = Object.keys(array[0]);
    const results = keys.filter((key) => key && key.includes('strIngredient'));
    setIngredients(results);
  };

  const filterMeasuresFunction = (array) => {
    const keys = Object.keys(array[0]);
    const results = keys.filter((key) => key && key.includes('strMeasure'));
    setMeasures(results);
  };

  useEffect(() => {
    const fetchMealsId = async () => {
      const response = await mealsIdAPI(id);
      setMeals(response);
      filterIngredientsFunction(response);
      filterMeasuresFunction(response);
    };

    fetchMealsId();
  }, []);

  return (
    <main>
      {
        meals && meals.map((meal) => (
          <div key={ meal.idMeal }>
            <img
              src={ meal.strMealThumb }
              alt={ meal.idMeal }
              data-testid="recipe-photo"
            />
            <h3 data-testid="recipe-title">{ meal.strMeal }</h3>
            <button type="button" data-testid="share-btn">Compartilhar</button>
            <button type="button" data-testid="favorite-btn">Favoritar</button>
            <p data-testid="recipe-category">{meal.strCategory}</p>
            <p data-testid="instructions">{meal.strIntructions}</p>
            <Ingredients
              recipes={ meals[0] }
              ingredients={ ingredients }
              measures={ measures }
            />
            <iframe
              src={ `https://www.youtube.com/embed/${meal.strYoutube.split('=')[1]}` }
              title={ meal.strTags }
              height="205"
              width="360"
            />
            <button
              type="button"
              data-testid="start-recipe-btn"
            >
              Começar Receita
            </button>
          </div>
        ))
      }
    </main>
  );
}
