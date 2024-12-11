import React, { useState } from 'react'
import { createContext } from 'react'

export const signUpAuth = createContext();

const AuthProvider = (props) => {

    const [signUpInfo, setSignUpInfo] = useState();
    const [loginInfo, setLoginInfo] = useState();

  return (
    <signUpAuth.Provider value={{signUpInfo, setSignUpInfo, loginInfo, setLoginInfo}}>
        {props.children}
    </signUpAuth.Provider>
  )
}

export default AuthProvider
