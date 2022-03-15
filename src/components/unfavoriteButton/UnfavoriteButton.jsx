import React, { useContext } from 'react';
import propTypes from 'prop-types';
import AppContext from '../../context/Context/AppContext';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function UnfavoriteButton({ id }) {
  const { setFavorites, favorites } = useContext(AppContext);

  const removeFromFavorites = () => {
    const storage = favorites;
    const results = storage.filter((favorite) => favorite.id !== id);
    console.log(results);
    localStorage.setItem('favoriteRecipes', JSON.stringify(results));
    setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };

  return (
    <button type="button" id={ id } onClick={ removeFromFavorites }>
      <img
        src={ blackHeartIcon }
        alt="Like icon"
        data-testid="favorite-btn"
      />
    </button>
  );
}

UnfavoriteButton.propTypes = {
  id: propTypes.string,
}.isRequired;
