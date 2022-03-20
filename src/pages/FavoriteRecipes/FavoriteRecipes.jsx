/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import AppContext from '../../context/Context/AppContext';
import Header from '../../components/Header/Header';
import shareIcon from '../../images/shareIcon.svg';
import UnfavoriteButton from '../../components/unfavoriteButton/UnfavoriteButton';

export default function FavoriteRecipes() {
  const { setSearchRender, favorites, setIsShowing } = useContext(AppContext);

  useEffect(() => {
    setSearchRender(true);
    setIsShowing(false);
  }, [favorites]);

  return (
    <main className="container-done">
      <Header title="Favorite Recipes" />
      <div className="container-category-button">
        <button
          className="category-button"
          data-testid="filter-by-all-btn"
          type="button"
        >
          All
        </button>
        <button
          className="category-button"
          data-testid="filter-by-food-btn"
          type="button"
        >
          Food
        </button>
        <button
          className="category-button"
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drink
        </button>
      </div>
      {
        favorites && favorites.map((favorite, index) => (
          <section
            key={ favorite.id }
            className="card-done"
          >
            <div className="container-title-done">
              <img
                className="card-image-done"
                src={ favorite.image }
                alt={ favorite.name }
                width="360px"
              />
              <h3
                className="card-name-done"
                data-testid={ `${index}-horizontal-name` }
              >
                { favorite.name }
              </h3>
              <div>
                <button
                  className="share-button-done"
                  type="button"
                  id={ favorite.id }
                >
                  <img
                    className="share-icon-done"
                    data-testid="share-btn"
                    src={ shareIcon }
                    alt="Share icon"
                  />
                </button>
                <UnfavoriteButton
                  id={ favorite.id }
                />
              </div>
            </div>
            <p
              className="card-type-done"
              data-testid={ `${index}-horizontal-top-text` }
            >
              { favorite.category }
            </p>
            { favorite.type === 'food'
              ? <p className="card-type-done">{favorite.nationality}</p>
              : <p className="card-type-done">{favorite.alcoholicOrNot}</p> }
          </section>
        ))
      }
    </main>
  );
}
