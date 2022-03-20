import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/Context/AppContext';
import Header from '../../components/Header/Header';
import UnfavoriteButton from '../../components/unfavoriteButton/UnfavoriteButton';
import ShareButton from '../../components/ShareButton/ShareButton';

export default function FavoriteRecipes() {
  const { setSearchRender, favorites, setFavorites } = useContext(AppContext);
  const [data, setData] = useState([]);

  const getFavorites = () => {
    setData(favorites);
  };

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  useEffect(() => {
    setSearchRender(false);
    getFavorites();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites]);

  const filterByFoods = () => {
    const results = favorites.filter((food) => food.type === 'food');
    setData(results);
  };

  const filterByDrinks = () => {
    const results = favorites.filter((food) => food.type === 'drink');
    setData(results);
  };

  return (
    <>
      <Header title="Favorite Recipes" />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ getFavorites }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ filterByFoods }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ filterByDrinks }
      >
        Drink
      </button>
      {
        data && data.map((favorite, index) => (
          <div key={ favorite.id }>
            <Link
              to={
                favorite
                  .type === 'food' ? `/foods/${favorite.id}` : `/drinks/${favorite.id}`
              }
            >
              <h2
                data-testid={ `${index}-horizontal-name` }
              >
                { favorite.name }

              </h2>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ favorite.image }
                alt={ favorite.name }
                width="360px"
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              { favorite.nationality }
              { favorite.type === 'food' ? ' - ' : null}
              { favorite.category }
              {
                favorite.type === 'drink' && (
                  <p>{ favorite.alcoholicOrNot }</p>
                )
              }
            </p>
            <ShareButton
              id={ favorite.id }
              datatestid={ `${index}-horizontal-share-btn` }
              type={ favorite.type }
            />
            <UnfavoriteButton
              datatestid={ `${index}-horizontal-favorite-btn` }
              id={ favorite.id }
            />
          </div>
        ))
      }
    </>
  );
}

// 'asdasdasdasdasdas'
