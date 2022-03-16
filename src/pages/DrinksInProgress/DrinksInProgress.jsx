import React, { useEffect, useContext, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import AppContext from '../../context/Context/AppContext';
import { cocktailsIdAPI } from '../../services/cocktailsAPI';
import IngredientsInProgress
from '../../components/IngredientsInProgress/IngredientsInProgress';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

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
    verifyFavoriteRecipes();
    setIsFood(false);
  }, [id, setDrinks, setIsFood]);

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
            recipes={ drinks[0] }
            ingredients={ ingredients }
            measures={ measures }
            id={ id }
            isFood={ isFood }
          />
          <Link to="/done-recipes">
            <button
              type="button"
              data-testid="finish-recipe-btn"
              className="finish-recipe-btn"
              disabled
            >
              Finish Recipe
            </button>
          </Link>
        </section>
      ))}
    </main>
  );
}
