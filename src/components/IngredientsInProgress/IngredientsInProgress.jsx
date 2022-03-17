/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';

function IngredientsInProgress({
  isFood, id, ingredients, measures, recipes, count, setCount }) {
  useEffect(() => {
    /* const obj = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const key = isFood ? 'meals' : 'cocktails';
    if (!obj) {
      const newObj = { meals: {}, cocktails: {} };
      newObj[key][id] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
    } if (obj) {
      const objKeys = Object.keys(obj[key]);
      const results = objKeys.some((recipe) => recipe === id);
      if (!results) {
        const newObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
        newObj[key][id] = [];
        localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
      }
    } */
  }, []);

  return (
    <div>
      {
        ingredients.map((ingredient, index) => (recipes[ingredient] && (
          <div
            key={ `${index}-ingredient` }
            data-testid={ `${index}-ingredient-step` }
          >
            <Input
              setCount={ setCount }
              count={ count }
              isFood={ isFood }
              type="checkbox"
              id={ `${index}-ingredient` }
              filterId={ id }
              value={ recipes[ingredient] }
              measures={ recipes[measures[index]] }
            />
          </div>
        )
        ))
      }
    </div>
  );
}

export default IngredientsInProgress;

IngredientsInProgress.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
