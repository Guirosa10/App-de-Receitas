import React, { useEffect, useContext } from 'react';
import Header from '../../components/Header/Header';
import AppContext from '../../context/Context/AppContext';

function Profile() {
  const { setSearchRender } = useContext(AppContext);
  useEffect(() => {
    setSearchRender(false);
  }, []);

  return (
    <Header title="Profile" />
  );
}

export default Profile;
