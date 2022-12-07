import React, { useEffect, useState, } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios"; 

const PrivateRoute = (props) => {
  const jwtToken = localStorage.getItem("user_token"); 
  const [loggedIn, setLoggedIn] = useState(undefined); 
  
  useEffect(() => {
    axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/secret`, {}, {
      headers: { Authorization: `JWT ${jwtToken}` }
    })
      .then(function(res) {
        setLoggedIn(res.data.success)
      })
      .catch(function(res, info, other){
        setLoggedIn(false)
      })
  }, [])

  if (loggedIn === undefined) return <div>Loading...</div>
  return loggedIn === true ? <Outlet/> : <Navigate to="/sign-in" replace/>;
}

export default PrivateRoute; 