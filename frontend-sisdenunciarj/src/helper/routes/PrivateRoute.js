import React,{useContext} from 'react';
import { Navigate } from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext'



function PrivateRoute({ children}) {

  const {user,setUser} = useContext(AuthContext); 
  const token = localStorage.getItem('_token');
 
  return user.name && token != "" ? children : 
  <Navigate to="/" />;
}


export default PrivateRoute;
