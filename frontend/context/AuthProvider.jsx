import React, { useState } from 'react'
import { createContext } from 'react'

export const signUpAuth = createContext();

const AuthProvider = (props) => {

    const [signUpInfo, setSignUpInfo] = useState([]);
    const [loginInfo, setLoginInfo] = useState();
    const [user, setUser] = useState(false);
    const [CInfo, setCInfo] = useState();
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const addUser = (newUser)=>{
      setSignUpInfo((prevUsers) => [...prevUsers, newUser]);
    }

    const triggerRefresh = () => setRefreshTrigger(prev => prev + 1);

  return (
    <signUpAuth.Provider value={{signUpInfo, setSignUpInfo, loginInfo, setLoginInfo, user, setUser, addUser,CInfo, setCInfo, refreshTrigger, triggerRefresh}}>
        {props.children}
    </signUpAuth.Provider>
  )
}

export default AuthProvider
