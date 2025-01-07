import React from 'react'
import Home from './home/Home'
import {Routes, Route, Navigate} from 'react-router-dom'
import Signup from './signup/Signup'
import Deepfake_detection from './deepfake/Deepfake_detection'
import Login from './login/Login'
import Records from './records/Records'
import { useContext } from 'react'
import { signUpAuth } from '../context/AuthProvider'
import Profile from './profile/Profile'

const App = () => {

  const authUser = useContext(signUpAuth)
  return (
    <>
        <div className='poppins-regular text-white'>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/deepfake-detection' element={authUser.user? <Deepfake_detection/> : <Navigate to="/login" />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/records' element={authUser.user? <Records/>: <Navigate to="/login" />} />
            <Route path='/profile' element={authUser.user? <Profile/>: <Navigate to="/login" />} />
          </Routes>
            
        </div>   
    </>
  )
}

export default App
