import React, { useEffect, useContext } from 'react';
import Header from '../../components/Header/Header';
import AppContext from '../../context/Context/AppContext';

export default function DoneRecipes() {
  const { setSearchRender } = useContext(AppContext);

  useEffect(() => {
    setSearchRender(false);
  }, [setSearchRender]);

  return (
    <Header title="Done Recipes" />
  );
}
