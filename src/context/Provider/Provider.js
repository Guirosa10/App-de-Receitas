import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../Context/AppContext';

function Provider({ children }) {
  const [login, setLogin] = useState('');

  const value = {
    login,
    setLogin,
  };

  return (
    <main>
      <AppContext.Provider value={ value }>
        {children}
      </AppContext.Provider>
    </main>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
