import React, { useEffect, useContext } from 'react';
import Header from '../../components/Header/Header';
import AppContext from '../../context/Context/AppContext';

export default function DoneRecipes() {
  const { setSearchRender } = useContext(AppContext);

  useEffect(() => {
    setSearchRender(false);
  }, [setSearchRender]);

  return (
    <div>
      <Header title="Done Recipes" />
      <button data-testid="filter-by-all-btn" type="button" onClick>
        All
      </button>
      <button data-testid="filter-by-food-btn" type="button" onClick>
        Food
      </button>
      <button data-testid="filter-by-drink-btn" type="button" onClick>
        Drink
      </button>
    </div>
  );
}
