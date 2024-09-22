import React from 'react'
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <>
        <div className="navbar bg-base-100 nav-gradient text-white md:px-4 sm:px-2">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden font-extrabold">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black font-extrabold">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/deepfake-detection'>Deepfake</Link></li>
                    <li><Link to='/records'>Records</Link></li>
                    <li><a>Profile</a></li>
                </ul>
                </div>
                <a className="text-lg md:text-xl cursor-pointer font-extrabold">Genuine Vision</a>
            </div>
            <div className="navbar-center hidden lg:flex space-x-2">
                <ul className="menu menu-horizontal px-1 font-extrabold">
                    <li><Link className='navitem' to='/'>Home</Link></li>
                    <li><Link className='navitem' to='/deepfake-detection'>Deepfake</Link></li>
                    <li><Link className='navitem' to='/records'>Records</Link></li>
                    <li><a className='navitem'>Profile</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <div>
                    <Link to='/login'><button className='px-4 py-1 font-extrabold rounded-lg border-2 navitem'>Login</button></Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar
