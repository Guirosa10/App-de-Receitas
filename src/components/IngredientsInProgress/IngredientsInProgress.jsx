import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/Input';

function IngredientsInProgress({ isFood, id, ingredients, measures, recipes }) {
  console.log(isFood);
  console.log('página de ingredientes em progresso componente');
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
                isFood={ isFood }
                type="checkbox"
                id={ `${index}-ingredient` }
                filterId={ id }
                value={ recipes[ingredient] }
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
