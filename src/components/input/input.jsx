/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import './style.css';

function Input({
  setDisabled, isFood, filterId, type, id, value, measures, count, setCount }) {
  const [checkedInput, setCheckedInput] = useState(false);

  const handleClick = () => {
    setCheckedInput(!checkedInput);
  };

  const handleInputFunction = () => {
    const obj = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const key = isFood ? 'meals' : 'cocktails';
    if (checkedInput) {
      obj[key][filterId].push(value);
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
      const input = document.getElementById(id);
      input.setAttribute('checked', 'checked');
      setCount(count + 1);
    }
    if (!checkedInput) {
      const array = obj[key][filterId];
      console.log(array);
      const results = array.filter((res) => res !== value);
      console.log(results);
      obj[key][filterId] = results;
      console.log(obj[key][filterId]);
      console.log(obj);
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
      setCount(count - 1);
      setDisabled(true);
    }
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

  useEffect(() => {
    handleInputFunction();
  }, [checkedInput]);

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
