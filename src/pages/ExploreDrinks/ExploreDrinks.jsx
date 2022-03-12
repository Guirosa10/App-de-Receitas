import React, { useEffect, useContext } from 'react';
import AppContext from '../../context/Context/AppContext';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function ExploreDrinks() {
  const { setSearchRender } = useContext(AppContext);

  useEffect(() => {
    setSearchRender(false);
  }, [setSearchRender]);

  return (
    <div>
      <Header title="Explore Drinks" />
      <Footer />
    </div>
  );
}
