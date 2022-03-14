import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

export default function Input({ filterId, type, onChange, id, value }) {
  const [checkedInput, setCheckedInput] = useState(false);
  /* const [inProgressStorage, setInProgressStorage] = useState(JSON
    .parse(localStorage.getItem('inProgressRecipe')));  */

  useEffect(() => {
    const filterFunction = () => {
      const storage = JSON
        .parse(localStorage.getItem('inProgressRecipes')) || { meals: {}, cocktails: {} };
      if (storage) {
        const recipe = storage.meals[filterId];
        const results = recipe.some((ingredient) => ingredient === value);
        if (results) {
          setCheckedInput(true);
        } else {
          setCheckedInput(false);
        }
      }
    };
    filterFunction();
  }, [filterId, value]);

  console.log(filterId);
  console.log(value);
  return (
    <input
      type={ type }
      onChange={ onChange }
      id={ id }
      value={ value }
      checked={ checkedInput }
    />
  );
}

Input.propTypes = {
  type: propTypes.string,
  onChange: propTypes.func,
  id: propTypes.string,
  value: propTypes.string,
  filterId: propTypes.string,
}.isRequired;
