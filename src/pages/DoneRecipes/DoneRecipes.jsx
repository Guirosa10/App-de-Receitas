/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from 'react';
import Header from '../../components/Header/Header';
import AppContext from '../../context/Context/AppContext';
import DoneRecipesCard from '../../components/DoneRecipesCard/DoneRecipesCard';

export default function DoneRecipes() {
  const { setSearchRender } = useContext(AppContext);
  const [data, setData] = useState([]);

  const getDoneRecipesStorage = () => {
    const results = JSON.parse(localStorage.getItem('doneRecipes'));
    setData(results);
  };

  useEffect(() => {
    setSearchRender(false);
    getDoneRecipesStorage();
  }, []);

  const filterByFood = () => {
    const results = JSON.parse(localStorage.getItem('doneRecipes'));
    const filteredResults = results.filter((recipe) => recipe.type === 'food');
    console.log(filteredResults);
    setData(filteredResults);
  };

  const filterByDrink = () => {
    const results = JSON.parse(localStorage.getItem('doneRecipes'));
    const filteredResults = results.filter((recipe) => recipe.type === 'drink');
    console.log(filteredResults);
    setData(filteredResults);
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ getDoneRecipesStorage }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ filterByFood }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ filterByDrink }
      >
        Drink
      </button>
      <DoneRecipesCard data={ data } />
    </div>
  );
}
