import React, { useEffect, useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../../context/Context/AppContext';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { fetchRandomDrinks } from '../../services/cocktailsAPI';

export default function ExploreDrinks() {
  const { setSearchRender } = useContext(AppContext);
  const [id, setId] = useState('');
  const history = useHistory();

  const redirectToRandomDrink = async () => {
    const results = await fetchRandomDrinks();
    setId(results.idDrink);
  };

  useEffect(() => {
    setSearchRender(false);
    redirectToRandomDrink();
  }, [setSearchRender]);

  return (
    <div>
      <Header title="Explore Drinks" />
      <Link to="/explore/drinks/ingredients">
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          By Ingredient
        </button>
      </Link>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => history.push(`/drinks/${id}`) }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}
