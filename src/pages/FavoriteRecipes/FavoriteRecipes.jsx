import React, { useEffect, useContext } from 'react';
import AppContext from '../../context/Context/AppContext';
import Header from '../../components/Header/Header';

export default function FavoriteRecipes() {
  const { setSearchRender } = useContext(AppContext);
  useEffect(() => {
    setSearchRender(false);
  }, []);

  return (
    <Header title="Favorite Recipes" />
  );
}
