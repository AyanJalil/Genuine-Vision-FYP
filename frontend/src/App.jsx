import React from 'react'
import Home from './home/Home'
import {Routes, Route} from 'react-router-dom'
import Signup from './signup/Signup'
import Deepfake_detection from './deepfake/Deepfake_detection'
import Login from './login/Login'
import Records from './records/Records'

const App = () => {
  return (
    
    <>
        <div className='poppins-regular text-white'>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/deepfake-detection' element={<Deepfake_detection/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/records' element={<Records/>} />
          </Routes>
            
        </div>   
    </>
  )
}

export default App
