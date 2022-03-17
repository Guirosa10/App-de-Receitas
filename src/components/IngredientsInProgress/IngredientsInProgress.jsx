/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '../input/input';

function IngredientsInProgress({
  isFood, id, ingredients, measures, recipes, count, setCount }) {
  useEffect(() => {
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
