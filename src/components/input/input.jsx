import React, { useEffect, useState, useContext } from 'react';
import propTypes from 'prop-types';
import AppContext from '../../context/Context/AppContext';

export default function Input({ isFood, filterId, type, id, value }) {
  const [checkedInput, setCheckedInput] = useState(false);
  const { inProgressRecipes, setInProgressRecipes } = useContext(AppContext);

  const handleClick = () => {
    if (isFood) {
      if (inProgressRecipes) {
        console.log(inProgressRecipes);
        const array = inProgressRecipes.meals[filterId].push(value);
        console.log(array);
        setInProgressRecipes(array);
        localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
        setCheckedInput(true);
      }
    } else if (inProgressRecipes) {
      setInProgressRecipes(JSON.parse(localStorage
        .getItem('inProgressRecipes')));
      const array = inProgressRecipes.cocktails[filterId];
      const newArray = array.push(e.target.value);
      setInProgressRecipes(newArray);
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      setCheckedInput(true);
    }
  };

  useEffect(() => {
    const filterFunction = () => {
      const storage = JSON
        .parse(localStorage.getItem('inProgressRecipes'));
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
