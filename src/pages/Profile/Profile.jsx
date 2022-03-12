import React, { useEffect, useContext } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import AppContext from '../../context/Context/AppContext';

function Profile() {
  const { setSearchRender } = useContext(AppContext);

  useEffect(() => {
    setSearchRender(false);
  }, [setSearchRender]);

  return (
    <div>
      <Header title="Profile" />
      <Footer />
    </div>
  );
}

export default Profile;
