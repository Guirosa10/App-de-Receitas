import React, { useEffect, useContext, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import AppContext from '../../context/Context/AppContext';
import { mealsIdAPI } from '../../services/mealsAPI';
import { cocktailsAPI } from '../../services/cocktailsAPI';
import Ingredients from '../../components/Ingredients/Ingredients';
import Recommended from '../../components/Recommended/Recommended';
import { RECOMENDATION_LENGTH } from '../../helpers/constants';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function FoodDetails() {
  const { meals, setMeals, favorite, setFavorite } = useContext(AppContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
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

    const fetchMealsRecomendation = async () => {
      const response = await cocktailsAPI();
      setRecomendation(response.slice(0, RECOMENDATION_LENGTH));
    };
    fetchMealsRecomendation();

    const verifyFavoriteRecipes = () => {
      const storage = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      console.log(storage);
      const results = storage.some((recipe) => recipe.id === id);
      if (results) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    };
    verifyFavoriteRecipes();
  }, [id, setMeals]);

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
      setFavorite([...favorite, newObj]);
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
          <Ingredients
            recipes={ meals[0] }
            ingredients={ ingredients }
            measures={ measures }
          />
          <iframe
            src={ `https://www.youtube.com/embed/${meal.strYoutube.split('=')[1]}` }
            title={ meal.strTags }
            data-testid="video"
            height="205"
            width="360"
          />
          <Recommended data={ recomendation } />
          <Link to={ `/foods/${id}/in-progress` }>
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe-btn"
            >
              Start Recipe
            </button>
          </Link>
        </section>
      ))}
    </main>
  );
}
