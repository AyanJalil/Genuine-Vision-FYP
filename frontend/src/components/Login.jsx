import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
        <Link to='/login'><button className='px-4 py-1 font-extrabold rounded-lg border-2 navitem'>Login</button></Link>
    </div>
  )
}

export default Login
