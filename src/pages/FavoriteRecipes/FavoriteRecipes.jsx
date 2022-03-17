import React, { useEffect, useContext } from 'react';
import AppContext from '../../context/Context/AppContext';
import Header from '../../components/Header/Header';
import shareIcon from '../../images/shareIcon.svg';
import UnfavoriteButton from '../../components/unfavoriteButton/UnfavoriteButton';

export default function FavoriteRecipes() {
  const { setSearchRender, favorites } = useContext(AppContext);
  useEffect(() => {
    setSearchRender(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites]);

  return (
    <>
      <Header title="Favorite Recipes" />
      <button data-testid="filter-by-all-btn" type="button">All</button>
      <button data-testid="filter-by-food-btn" type="button">Food</button>
      <button data-testid="filter-by-drink-btn" type="button">Drink</button>
      {
        favorites && favorites.map((favorite, index) => (
          <div key={ favorite.id }>
            <h2
              data-testid={ `${index}-horizontal-name` }
            >
              { favorite.name }

            </h2>
            <img
              src={ favorite.image }
              alt={ favorite.name }
              width="360px"
            />
            <p data-testid={ `${index}-horizontal-top-text` }>{ favorite.category }</p>
            {
              favorite.type === 'food'
                ? <p>{favorite.nationality}</p> : <p>{favorite.alcoholicOrNot}</p>
            }
            <button
              type="button"
              id={ favorite.id }
            >
              <img
                data-testid="share-btn"
                src={ shareIcon }
                alt="Share icon"
              />
            </button>
            <UnfavoriteButton
              id={ favorite.id }
            />
          </div>
        ))
      }
    </>
  );
}
