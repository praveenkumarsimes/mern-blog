import React, { createContext, useContext, useEffect, useState } from 'react';

const CustonContext = createContext();

const AuthContext = ({children}) => {
    const [authToken ,setAuthToken]=useState(null);
    useEffect(()=>{
      let data = localStorage.getItem('token')
      setAuthToken(JSON.parse(data))
    },[])
  return (
    <CustonContext.Provider value={{authToken ,setAuthToken}}>{children}</CustonContext.Provider>
  )
}

export const AuthState =()=> useContext(CustonContext);

export default AuthContext