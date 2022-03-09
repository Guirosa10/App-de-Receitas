import React, { useEffect, useContext } from 'react';
import Header from '../../components/Header/Header';
import AppContext from '../../context/Context/AppContext';

export default function ExploreFoodsNacionalites() {
  const { setSearchRender } = useContext(AppContext);
  useEffect(() => {
    setSearchRender(true);
  }, []);

  return (
    <Header title="Explore Nationalities" />
  );
}
