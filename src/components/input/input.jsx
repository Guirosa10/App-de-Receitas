/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';

function Input({
  isFood, filterId, type, id, value, measures, count, setCount }) {
  const [checkedInput, setCheckedInput] = useState(false);

  const handleClick = () => {
    const obj = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const key = isFood ? 'meals' : 'cocktails';
    obj[key][filterId].push(value);
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    const input = document.getElementById(id);
    input.setAttribute('checked', 'checked');
    setCheckedInput(true);
    setCount(count + 1);
  };

  const filterFunction = () => {
    const obj = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const key = isFood ? 'meals' : 'cocktails';
    const array = obj[key][filterId];
    if (array) {
      const results = array.some((ingredient) => ingredient === value);
      const input = document.getElementById(id);
      if (results) {
        input.setAttribute('checked', 'checked');
        setCheckedInput(results);
      }
    }
  };

  useEffect(() => {
    filterFunction();
  }, []);

  return (
    <div>
      <label
        className={ checkedInput ? 'riscado' : '' }
        htmlFor={ id }
      >
        <input
          type={ type }
          onChange={ handleClick }
          id={ id }
          value={ value }
          checked={ checkedInput }
          data-testid={ id }
        />
        {' '}
        { value }
        { measures ? ': ' : null}
        { measures }
      </label>
    </div>
  );
}

export default Input;

Input.propTypes = {
  type: propTypes.string,
  onChange: propTypes.func,
  id: propTypes.string,
  value: propTypes.string,
  filterId: propTypes.string,
}.isRequired;
