import React, { useContext } from 'react';
import AuthContext from '../AuthContext/AuthContext';

const MainLayout = () => {
  const {names} = useContext(AuthContext)
  return (
    <div>
      This is main layout 
      <h1>{names}</h1>
    </div>
  );
};

export default MainLayout;