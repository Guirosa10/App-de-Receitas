import React, { useEffect, useState, useContext } from 'react';
import propTypes from 'prop-types';
import AppContext from '../../context/Context/AppContext';
import './style.css';

function Input({ datatestid, isFood, filterId, type, id, value, measures }) {
  const [checkedInput, setCheckedInput] = useState(false);
  const { inProgressRecipes, setInProgressRecipes } = useContext(AppContext);
  /* const [strikethrough, setStrikethrough] = useState(false); */

  const handleClick = () => {
    console.log(inProgressRecipes);
    const obj = inProgressRecipes;
    console.log(obj);
    if (isFood) {
      obj.meals[filterId].push(value);
      setInProgressRecipes(obj);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      setCheckedInput(true);
      return;
    }

    obj.cocktails[filterId].push(value);
    setInProgressRecipes(obj);
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    setCheckedInput(true);
  };

  useEffect(() => {
    const filterFunction = () => {
      const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      /* setInProgressRecipes(JSON.parse(localStorage.getItem('inProgressRecipes'))); */
      if (storage) {
        const recipe = isFood ? storage.meals[filterId] : storage.cocktails[filterId];
        const results = recipe.some((ingredient) => ingredient === value);
        setCheckedInput(results);
      }
      setInProgressRecipes(storage);
    };
    filterFunction();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <input
        type={ type }
        onChange={ handleClick }
        id={ id }
        value={ value }
        checked={ checkedInput }
        data-testid={ datatestid }
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
