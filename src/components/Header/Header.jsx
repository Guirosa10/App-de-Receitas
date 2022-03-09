import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../context/Context/AppContext';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header({ title }) {
  const { searchRender } = useContext(AppContext);
  const [searchButton, setSearchButton] = useState(false);
  const history = useHistory();

  return (
    <header>
      <button
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="perfil-Icon"
        />
      </button>
      <h2
        data-testid="page-title"
      >
        { title }
      </h2>
      {
        searchRender && (
          <button
            type="button"
            onClick={ () => setSearchButton(!searchButton) }
          >
            <img src={ searchIcon } data-testid="search-top-btn" alt="profileIcon" />
          </button>
        )
      }
      <section>
        { searchButton && <input type="text" data-testid="search-input" /> }
      </section>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
