import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/Context/AppContext';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function Explore() {
  const { setSearchRender } = useContext(AppContext);

  useEffect(() => {
    setSearchRender(false);
  }, [setSearchRender]);

  return (
    <div>
      <Header title="Explore" />
      <Link to="/explore/foods">
        <button
          data-testid="explore-foods"
          type="button"
        >
          Explore Foods
        </button>
      </Link>
      <Link to="/explore/drinks">
        <button
          data-testid="explore-drinks"
          type="button"
        >
          Explore Drinks
        </button>
      </Link>
      <Footer />
    </div>
  );
}
