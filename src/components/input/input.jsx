import React, { useEffect, useState, useContext } from 'react';
import propTypes from 'prop-types';
import AppContext from '../../context/Context/AppContext';

export default function Input({ isFood, filterId, type, id, value }) {
  const [checkedInput, setCheckedInput] = useState(false);
  const { inProgressRecipes, setInProgressRecipes } = useContext(AppContext);

  const handleClick = () => {
    if (isFood) {
      if (inProgressRecipes) {
        const obj = inProgressRecipes;
        obj.meals[filterId].push(value);
        setInProgressRecipes(obj);
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
        setCheckedInput(true);
      }
    } else if (inProgressRecipes) {
      const obj = inProgressRecipes;
      obj.cocktails[filterId].push(value);
      setInProgressRecipes(obj);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      setCheckedInput(true);
    }
  };
  const storage = JSON
    .parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    const recipe = isFood ? storage.meals[filterId] : storage.cocktails[filterId];
    const filterFunction = () => {
      if (storage) {
        const results = recipe.some((ingredient) => ingredient === value);
        if (results) {
          setCheckedInput(true);
        } else {
          setCheckedInput(false);
        }
      }
      setInProgressRecipes(JSON.parse(localStorage.getItem('inProgressRecipes')));
    };
    filterFunction();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <input
      type={ type }
      onChange={ handleClick }
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
