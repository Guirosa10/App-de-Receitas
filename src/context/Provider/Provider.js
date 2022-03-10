import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../Context/AppContext';

function Provider({ children }) {
  const [login, setLogin] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [isFood, setIsFood] = useState(true);

  const value = {
    login,
    setLogin,
    meals,
    setMeals,
    drinks,
    setDrinks,
    isFood,
    setIsFood,
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
