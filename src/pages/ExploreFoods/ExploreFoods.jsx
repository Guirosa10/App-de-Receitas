import React, { useEffect, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../../context/Context/AppContext';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { fetchRandomMeal } from '../../services/mealsAPI';

export default function ExploreFoods() {
  const { setSearchRender } = useContext(AppContext);
  const [id, setId] = useState('');
  const history = useHistory();

  const redirectToRandomMeal = async () => {
    const results = await fetchRandomMeal();
    setId(results.idMeal);
  };

  useEffect(() => {
    setSearchRender(false);
    redirectToRandomMeal();
  }, [setSearchRender]);

  return (
    <div>
      <Header title="Explore Foods" />
      <Link to="/explore/foods/ingredients">
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          By Ingredient
        </button>
      </Link>
      <Link to="/explore/foods/nationalities">
        <button
          data-testid="explore-by-nationality"
          type="button"
        >
          By Nationality
        </button>
      </Link>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => history.push(`/foods/${id}`) }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}
