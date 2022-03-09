import React, { useState } from 'react';
/* import { fetchByFirstLetter, fetchByIngredient, fetchByName } from '../../services/api'; */
import './style.css';

export default function SearchBar() {
  const [radioOption, setRadioOption] = useState('');

  /* const fetchMealByName = async () => {
    const results = fetchByName(searchinput);
    setFoods(results);
  };

  const fetchMealByingredient = async () => {
    const results = fetchByIngredient(searchinput);
    setFoods(results);
  };

  const fetchMealByFirstLetter = async () => {
    const results = fetchByFirstLetter(searchinput);
    setFoods(results);
  }; */

  /* const handleSubmitButton = () => {
    if (radioOption === "ingredient"){
      fetchMealByIngredient()
    }
    if (radioOption === "name"){
      fetchmealByName()
    }
    if (radioOption === "firstLetter"){
      fetchMealByFirstLetter()
    }
  } */

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
        >
          Busca
        </button>
      </form>
    </div>
  );
}
