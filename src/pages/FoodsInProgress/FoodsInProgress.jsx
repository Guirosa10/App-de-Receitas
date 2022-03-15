import React, { useEffect, useContext, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import AppContext from '../../context/Context/AppContext';
import { mealsIdAPI } from '../../services/mealsAPI';
import IngredientsInProgress
from '../../components/IngredientsInProgress/IngredientsInProgress';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function FoodsInProgress() {
  const {
    meals,
    setMeals,
    isFood,
    setIsFood } = useContext(AppContext);

  const { id } = useParams();
  const { pathname } = useLocation();
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [isShowingMessage, setIsShowingMessage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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
    setIsFood(true);
  }, [id, setMeals, setIsFood]);

  const handleShare = () => {
    const shareRecipe = navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
    setIsShowingMessage(true);
    return shareRecipe;
  };

  const saveFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      const newObj = {
        id,
        type: 'food',
        nationality: meals[0].strArea,
        category: meals[0].strCategory,
        alcoholicOrNot: '',
        name: meals[0].strMeal,
        image: meals[0].strMealThumb,
      };
      setIsFavorite(true);
      const previousObjects = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const updatedObjects = [...previousObjects, newObj];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedObjects));
    }
  };

  return (
    <main>
      { meals && meals.map((meal) => (
        <section key={ meal.idMeal }>
          <img
            src={ meal.strMealThumb }
            alt={ meal.idMeal }
            data-testid="recipe-photo"
            width="360px"
          />
          <h3 data-testid="recipe-title">{ meal.strMeal }</h3>
          <p data-testid="recipe-category">{ meal.strCategory }</p>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ handleShare }
          >
            <img
              src={ shareIcon }
              alt="Share icon"
            />
          </button>
          { isShowingMessage ? <span>Link copied!</span> : null}
          <button
            type="button"
            onClick={ saveFavorite }
          >
            <img
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="Like icon"
              data-testid="favorite-btn"
            />
          </button>
          <p data-testid="instructions">{ meal.strInstructions }</p>
          <IngredientsInProgress
            recipes={ meals[0] }
            ingredients={ ingredients }
            measures={ measures }
            id={ id }
            isFood={ isFood }
          />
          <button
            type="button"
            data-testid="finish-recipe-btn"
            className="finish-recipe-btn"
          >
            Finish Recipe
          </button>
        </section>
      ))}
    </main>
  );
}
