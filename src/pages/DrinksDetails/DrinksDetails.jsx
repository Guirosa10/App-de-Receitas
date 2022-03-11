/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Ingredients from '../../components/Ingredients/Ingredients';
import AppContext from '../../context/Context/AppContext';
import { cocktailsIdAPI } from '../../services/cocktailsAPI';

export default function DrinksDetails() {
  const { drinks, setDrinks } = useContext(AppContext);
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    const fetchDrinksId = async () => {
      const response = await cocktailsIdAPI(id);
      setDrinks(response);
      setIngredients(response);
    };
    fetchDrinksId();
  }, []);

  return (
    <main>
      <section>
        <h2>DrinksDetails</h2>
        {
          drinks && drinks.map((drink, index) => (
            <div key={ drink.idMeal }>
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
              <button type="button" data-testid="share-btn">
                Compartilhar
              </button>
              <button type="button" data-testid="favorite-btn">
                Favoritar
              </button>
              <h4>Ingredients</h4>
              <section data-testid={ `${index}-ingredient-name-and-measure` }>
                <Ingredients ingredients={ ingredients } />
              </section>
              <p data-testid="instructions">{ drink.strInstructions }</p>
              <button type="button" data-testid="start-recipe-btn">
                Começar Receita
              </button>
            </div>
          ))
        }
      </section>
    </main>
  );
}
