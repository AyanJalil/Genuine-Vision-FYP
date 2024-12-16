import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { signUpAuth } from '../../context/AuthProvider'
const Logout = () => {

  const logout = useContext(signUpAuth);
  const handleLogout = ()=>{
    logout.setUser(false);
  }

  return (
    <div>
      <Link to='/'><button onClick={handleLogout} className='px-4 py-1 font-extrabold rounded-lg border-2 navitem bg-red-500'>Logout</button></Link>
    </div>
  )
}

export default Logout
