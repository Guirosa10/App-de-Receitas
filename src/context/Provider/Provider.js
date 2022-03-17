import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../Context/AppContext';

function Provider({ children }) {
  const [login, setLogin] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [isFood, setIsFood] = useState(true);
  const [searchRender, setSearchRender] = useState(true);
  const [favorites, setFavorites] = useState(JSON
    .parse(localStorage.getItem('favoriteRecipes')));
  const [inProgressRecipes, setInProgressRecipes] = useState(JSON.parse(localStorage
    .getItem('inProgressRecipes')));

  const value = {
    login,
    setLogin,
    meals,
    setMeals,
    drinks,
    setDrinks,
    isFood,
    setIsFood,
    searchRender,
    setSearchRender,
    favorites,
    setFavorites,
    inProgressRecipes,
    setInProgressRecipes,
  };

  return (
    <main>
      <AppContext.Provider value={ value }>
        {children}
      </AppContext.Provider>
    </main>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
