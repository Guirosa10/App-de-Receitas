import React from 'react';
import PropTypes from 'prop-types';

export default function IngredientsInProgress({ ingredients, measures, recipes }) {
  // const handleClick = ({ target }) => {

  // };

  return (
    <ul style={ { listStyleType: 'none' } }>
      {
        ingredients.map((ingredient, index) => (recipes[ingredient] && (
          <li
            key={ `${index}-ingredient` }
            data-testid={ `${index}-ingredient-step` }
          >
            <label htmlFor={ `${index}-ingredient` }>
              <input
                type="checkbox"
                id={ `${index}-ingredient` }
                value={ recipes[ingredient] }
                key={ `${index}-ingredient` }
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

IngredientsInProgress.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
