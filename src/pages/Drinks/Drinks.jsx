import React, { useEffect, useContext } from 'react';
import AppContext from '../../context/Context/AppContext';
import Header from '../../components/Header/Header';

export default function Drinks() {
  const { setSearchRender } = useContext(AppContext);
  useEffect(() => {
    setSearchRender(true);
  }, []);
  return (
    <Header title="Drinks" />
  );
}
