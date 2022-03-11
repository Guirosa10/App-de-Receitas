/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../context/Context/AppContext';
import { cocktailsIdAPI } from '../../services/cocktailsAPI';

export default function DrinksDetails() {
  const { drinks, setDrinks } = useContext(AppContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchDrinksId = async () => {
      const response = await cocktailsIdAPI(id);
      setDrinks(response);
    };
    fetchDrinksId();
  }, []);

  return (
    <main>
      <section>
        <h3>DrinksDetails</h3>
        {
          drinks && drinks.map((drink) => (
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.idDrink }
              key={ drink.idDrink }
            />
          ))
        }
      </section>
    </main>
  );
}
