import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import AppContext from '../../context/Context/AppContext';

function Profile() {
  const { setSearchRender } = useContext(AppContext);

  useEffect(() => {
    setSearchRender(false);
  }, [setSearchRender]);

  const getEmail = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const toFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const toDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" />
      <section>
        <p data-testid="profile-email">
          {getEmail.email}
        </p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ toDoneRecipes }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ toFavoriteRecipes }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ clearLocalStorage }
        >
          Logout
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default Profile;
