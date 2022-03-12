import React, { useEffect, useContext, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import AppContext from '../../context/Context/AppContext';
import { cocktailsIdAPI } from '../../services/cocktailsAPI';
import { mealsAPI } from '../../services/mealsAPI';
import Ingredients from '../../components/Ingredients/Ingredients';
import Recommended from '../../components/Recommended/Recommended';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { RECOMENDATION_LENGTH } from '../../helpers/constants';

export default function DrinksDetails() {
  const { drinks, setDrinks } = useContext(AppContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recomendation, setRecomendation] = useState([]);

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

    const fetchDrinksRecomendation = async () => {
      const response = await mealsAPI();
      setRecomendation(response.slice(0, RECOMENDATION_LENGTH));
    };
    fetchDrinksRecomendation();
  }, [id, setDrinks]);

  const handleShare = () => {
    const shareRecipe = navigator.clipboard.writeText(pathname);
    global.alert('Link copied!');
    return shareRecipe;
  };

  return (
    <main>
      { drinks && drinks.map((drink, index) => (
        <section key={ drink.idDrink }>
          <img
            data-testid="recipe-photo"
            src={ drink.strDrinkThumb }
            alt={ drink.idDrink }
            key={ drink.idDrink }
          />
          <h3 data-testid="recipe-title">{drink.strDrink}</h3>
          <p data-testid="recipe-category">
            { drink.strAlcoholic }
          </p>
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
          <button type="button" data-testid="favorite-btn">
            <img
              src={ whiteHeartIcon }
              alt="Like icon"
            />
          </button>
          <h4>Ingredients</h4>
          <section data-testid={ `${index}-ingredient-name-and-measure` }>
            <Ingredients
              recipes={ drinks[0] }
              ingredients={ ingredients }
              measures={ measures }
            />
          </section>
          <p data-testid="instructions">{ drink.strInstructions }</p>
          <Recommended data={ recomendation } />
          <Link to={ `/drinks/${id}/in-progress` }>
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe-btn"
            >
              Começar Receita
            </button>
          </Link>
        </section>
      ))}
    </main>
  );
}
