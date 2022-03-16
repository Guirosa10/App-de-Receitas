/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import './style.css';

function Input({
  isFood, filterId, type, id, value, measures, setingredientsList, ingredientsList }) {
  const [checkedInput, setCheckedInput] = useState(false);

  const handleClick = () => {
    const obj = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const key = isFood ? 'meals' : 'cocktails';
    obj[key][filterId].push(value);
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    const input = document.getElementById(id);
    input.setAttribute('checked', 'checked');
    setCheckedInput(true);
    setingredientsList([...ingredientsList, value]);
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
    <>
      <input
        type={ type }
        onChange={ handleClick }
        id={ id }
        value={ value }
        checked={ checkedInput }
        data-testid={ id }
      />
      <p
        className={ checkedInput ? 'riscado' : '' }
      >
        { value }
        { measures ? '----' : null}
        { measures }
      </p>
    </>

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
