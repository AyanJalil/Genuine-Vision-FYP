import React, { useState } from 'react'
import { createContext } from 'react'

export const signUpAuth = createContext();

const AuthProvider = (props) => {

    const [signUpInfo, setSignUpInfo] = useState([]);
    const [loginInfo, setLoginInfo] = useState();
    const [user, setUser] = useState(false);

    const addUser = (newUser)=>{
      setSignUpInfo((prevUsers) => [...prevUsers, newUser]);
    }

  return (
    <signUpAuth.Provider value={{signUpInfo, setSignUpInfo, loginInfo, setLoginInfo, user, setUser, addUser}}>
        {props.children}
    </signUpAuth.Provider>
  )
}

export default AuthProvider
