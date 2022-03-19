/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import AppContext from '../../context/Context/AppContext';
import { cocktailsIdAPI } from '../../services/cocktailsAPI';
import IngredientsInProgress
from '../../components/IngredientsInProgress/IngredientsInProgress';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import FinishRecipeButton from '../../components/FinishRecipeButton/FinishRecipeButton';

export default function FoodsInProgress() {
  const {
    drinks,
    setDrinks,
    isFood,
    setIsFood } = useContext(AppContext);

  const { id } = useParams();
  const { pathname } = useLocation();
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [isShowingMessage, setIsShowingMessage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [count, setCount] = useState(0);

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

  const getStorageFunction = () => {
    const obj = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!obj) {
      const newObj = { meals: {}, cocktails: {} };
      newObj.cocktails[id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
    } if (obj) {
      const objKeys = Object.keys(obj.cocktails);
      const results = objKeys.some((recipe) => recipe === id);
      if (!results) {
        const newObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
        newObj.cocktails[id] = [];
        localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
      }
    }
  };

  useEffect(() => {
    const fetchDrinksId = async () => {
      const response = await cocktailsIdAPI(id);
      setDrinks(response);
      filterIngredientsFunction(response);
      filterMeasuresFunction(response);
    };
    fetchDrinksId();

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
    getStorageFunction();
    verifyFavoriteRecipes();
    setIsFood(false);
  }, [id, setDrinks, setIsFood]);

  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const array = obj.cocktails[id];
    setCount(array.length);
    if (drinks.length > 0 && count > 0) {
      const results = ingredients.filter((ingredient) => drinks[0][ingredient]);
      if (count >= results.length) {
        setDisabled(false);
      }
    }
  }, [count]);

  const handleShare = () => {
    const address = pathname.split('/i')[0];
    const shareRecipe = navigator.clipboard.writeText(`http://localhost:3000${address}`);
    setIsShowingMessage(true);
    return shareRecipe;
  };

  const saveFavorite = () => {
    if (isFavorite) {
      setIsFavorite(false);
    } else {
      const newObj = {
        id,
        type: 'drink',
        nationality: '',
        category: drinks[0].strCategory,
        alcoholicOrNot: drinks[0].strAlcoholic,
        name: drinks[0].strDrink,
        image: drinks[0].strDrinkThumb,
      };
      setIsFavorite(true);
      const previousObjects = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const updatedObjects = [...previousObjects, newObj];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedObjects));
    }
  };

  return (
    <main>
      { drinks && drinks.map((drink) => (
        <section key={ drink.idDrink }>
          <img
            src={ drink.strDrinkThumb }
            alt={ drink.idDrink }
            data-testid="recipe-photo"
            width="360px"
          />
          <h3 data-testid="recipe-title">{ drink.strDrink }</h3>
          <p data-testid="recipe-category">{ drink.strAlcoholic }</p>
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
          <p data-testid="instructions">{ drink.strInstructions }</p>
          <IngredientsInProgress
            count={ count }
            setCount={ setCount }
            recipes={ drinks[0] }
            ingredients={ ingredients }
            measures={ measures }
            id={ id }
            isFood={ isFood }
          />
          <FinishRecipeButton
            recipe={ drinks[0] }
            ingredients={ ingredients }
            datatestid="finish-recipe-btn"
            className="finish-recipe-btn"
            disabled={ disabled }
            setDisabled={ setDisabled }
            count={ count }
          />
        </section>
      ))}
    </main>
  );
}
