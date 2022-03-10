import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/Context/AppContext';
import { mealsAPI, cocktailsAPI,
  mealsCategoriesAPI, cocktailsCategoriesAPI } from '../../services/api';

export default function Button({ dataTestId, name }) {
  const { isFood, setMeals, setDrinks } = useContext(AppContext);
  const [toggle, setToggle] = useState(false);

  const handleClick = async (category) => {
    if (toggle) {
      if (isFood) {
        const results = await mealsAPI();
        results.length = 12;
        setMeals(results);
      } else {
        const results = await cocktailsAPI();
        results.length = 12;
        setDrinks(results);
      }
    }

    if (!toggle) {
      if (isFood) {
        const results = await mealsCategoriesAPI(category);
        results.length = 12;
        setMeals(results);
      } else {
        const results = await cocktailsCategoriesAPI(category);
        results.length = 12;
        setDrinks(results);
      }
    }
    setToggle(!toggle);
  };

  return (
    <button
      type="button"
      data-testid={ dataTestId }
      onClick={ () => handleClick(name) }
    >
      { name }
    </button>
  );
}

Button.propTypes = {
  key: PropTypes.string,
  dataTestId: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.string,
}.isRequired;
