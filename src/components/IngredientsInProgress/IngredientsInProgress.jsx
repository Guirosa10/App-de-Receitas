import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';

function IngredientsInProgress({ isFood, id, ingredients, measures, recipes }) {
  const [inProgressRecipes, setInProgressRecipes] = useState(JSON.parse(localStorage
    .getItem('inProgressRecipes')));

  const handleClick = (e) => {
    if (isFood) {
      const array = inProgressRecipes.meals[id];
      array.push(e.target.value);
      setInProgressRecipes(array);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    } else {
      const array = inProgressRecipes.cocktails[id];
      array.push(e.target.value);
      setInProgressRecipes(array);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
  };

  return (
    <ul style={ { listStyleType: 'none' } }>
      {
        ingredients.map((ingredient, index) => (recipes[ingredient] && (
          <li
            key={ `${index}-ingredient` }
            data-testid={ `${index}-ingredient-step` }
          >
            <label htmlFor={ `${index}-ingredient` }>
              <Input
                type="checkbox"
                id={ `${index}-ingredient` }
                filterId={ id }
                value={ recipes[ingredient] }
                onChange={ handleClick }
                /* checked={ filterFunction() } */
              />
              <span className="strikethrough">
                {' '}
                { recipes[ingredient] }
                { recipes[measures[index]] ? ' ----- ' : null}
                { recipes[measures[index]] }
              </span>
            </label>
          </li>
        )
        ))
      }
    </ul>
  );
}

export default IngredientsInProgress;

IngredientsInProgress.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
