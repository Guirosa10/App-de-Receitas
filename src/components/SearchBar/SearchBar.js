import React, { useContext, useState } from 'react';
import propTypes from 'prop-types';
import { fetchByFirstLetter,
  fetchByIngredient, fetchByName } from '../../services/mealsAPI';
import { getDrinkByFirstLetter,
  getDrinkByName,
  getDrinkByIngredient } from '../../services/cocktailsAPI';
import './style.css';
import AppContext from '../../context/Context/AppContext';
import { RECIPES_LENGTH } from '../../helpers/constants';
/* import { RECIPES_LENGTH } from '../../helpers/constants'; */

export default function SearchBar({ input }) {
  const [radioOption, setRadioOption] = useState('');
  const { isFood, setDrinks, setMeals } = useContext(AppContext);

  const error = () => global
    .alert('Sorry, we haven\'t found any recipes for these filters.');

  const checkError = (results) => {
    if (!results) {
      error();
      return true;
    }
    return false;
  };

  const fetchMealByName = async () => {
    const results = await fetchByName(input);
    if (!checkError(results)) {
      setMeals(results.slice(0, RECIPES_LENGTH));
    }
  };

  const fetchMealByingredient = async () => {
    const results = await fetchByIngredient(input);
    if (!checkError(results)) {
      setMeals(results.slice(0, RECIPES_LENGTH));
    }
  };

  const fetchMealByFirstLetter = async () => {
    const results = await fetchByFirstLetter(input);
    if (!checkError(results)) {
      setMeals(results.slice(0, RECIPES_LENGTH));
    }
  };

  const fetchDrinkByName = async () => {
    const results = await getDrinkByName(input);
    if (!checkError(results)) {
      setDrinks(results.slice(0, RECIPES_LENGTH));
    }
  };

  const fetchDrinkByIngredient = async () => {
    const results = await getDrinkByIngredient(input);
    if (!checkError(results)) {
      setDrinks(results.slice(0, RECIPES_LENGTH));
    }
  };

  const fetchDrinkByFirstLetter = async () => {
    const results = await getDrinkByFirstLetter(input);
    if (!checkError(results)) {
      setDrinks(results.slice(0, RECIPES_LENGTH));
    }
  };

  const handleFoods = async () => {
    if (isFood) {
      if (radioOption === 'ingredient') {
        await fetchMealByingredient();
      }
      if (radioOption === 'name') {
        await fetchMealByName();
      }
      if (radioOption === 'firstLetter') {
        if (input.length === 1) {
          await fetchMealByFirstLetter();
        } else {
          global.alert('Your search must have only 1 (one) character');
        }
      }
    }
  };

  const handleDrinks = async () => {
    if (!isFood) {
      if (radioOption === 'ingredient') {
        await fetchDrinkByIngredient();
      }
      if (radioOption === 'name') {
        await fetchDrinkByName();
      }
      if (radioOption === 'firstLetter') {
        if (input.length === 1) {
          await fetchDrinkByFirstLetter();
        } else {
          global.alert('Your search must have only 1 (one) character');
        }
      }
    }
  };

  const handleSubmitButton = async (e) => {
    e.preventDefault();
    handleDrinks();
    handleFoods();
  };

  return (
    <div className="search-form-div">
      <form className="search-form">
        <input
          type="radio"
          name="um"
          value="ingredient"
          data-testid="ingredient-search-radio"
          onChange={ (e) => setRadioOption(e.target.value) }
          checked={ radioOption === 'ingredient' }
        />
        Busca por Ingrediente
        <input
          type="radio"
          name="um"
          value="name"
          data-testid="name-search-radio"
          onChange={ (e) => setRadioOption(e.target.value) }
          checked={ radioOption === 'name' }
        />
        Busca por nome
        <input
          type="radio"
          name="um"
          value="firstLetter"
          data-testid="first-letter-search-radio"
          checked={ radioOption === 'firstLetter' }
          onChange={ (e) => setRadioOption(e.target.value) }
        />
        Busca da primeira letra
        <button
          type="submit"
          data-testid="exec-search-btn"
          onClick={ handleSubmitButton }
        >
          Busca
        </button>
      </form>
    </div>
  );
}

SearchBar.propTypes = {
  input: propTypes.string,
}.isRequired;
