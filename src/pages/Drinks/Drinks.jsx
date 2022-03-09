import React, { useEffect, useContext } from 'react';
import AppContext from '../../context/Context/AppContext';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function Drinks() {
  const { setSearchRender } = useContext(AppContext);
  useEffect(() => {
    setSearchRender(true);
  }, []);
  return (
    <div>
      <Header title="Drinks" />
      <Footer />
    </div>
  );
}
