import React, { useContext } from 'react';
import AuthContext from '../AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivetRoute = ({children}) => {
  const {user,loading} = useContext(AuthContext)
  // const navigate = useNavigate()
  const location = useLocation()

  if(loading){
    return (
      <h2 className='text-3xl'>
        Loading ...
        <span className="loading loading-spinner  w-20 bg-blue-600"></span>
      </h2>
    )
  }
  if(!user){
    return <Navigate state={{from:location.pathname}} to='/login'></Navigate>
  }

  return children;
};

export default PrivetRoute;