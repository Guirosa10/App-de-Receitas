import React from 'react';
import propTypes, { object } from 'prop-types';

export default function Ingredients({ ingredients, measures, recipes }) {
  console.log('ingredientes');
  console.log(ingredients);
  console.log('receitas');
  console.log(recipes);
  return (
    <ul>
      {
        ingredients.map((ingredient, index) => (recipes[ingredient] && (
          <li key={ ingredient }>
            { recipes[ingredient] }
            {' --- '}
            { recipes[measures[index]] }
          </li>
        )
        ))
      }
    </ul>
  );
}

Ingredients.propTypes = {
  ingredients: propTypes.arrayOf(object),
}.isRequired;
