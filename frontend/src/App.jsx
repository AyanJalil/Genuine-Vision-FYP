import React from 'react'
import Home from './home/Home'
import {Routes, Route, Navigate} from 'react-router-dom'
import Signup from './signup/Signup'
import Deepfake_detection from './deepfake/Deepfake_detection'
import Login from './login/Login'
import Records from './records/Records'
import { useContext } from 'react'
import { signUpAuth } from '../context/AuthProvider'

const App = () => {

  const authUser = useContext(signUpAuth)
  console.log(authUser);
  return (
    <>
        <div className='poppins-regular text-white'>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/deepfake-detection' element={authUser.signUpInfo? <Deepfake_detection/> : <Navigate to="/login" />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/records' element={authUser.signUpInfo? <Records/>: <Navigate to="/login" />} />
          </Routes>
            
        </div>   
    </>
  )
}

export default App
