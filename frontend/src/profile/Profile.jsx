import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import UpdateInfo from '../components/UpdateInfo'
import CurrentInfo from 'src\components\CurrentInfo.jsx'

const Profile = () => {
  return (
    <>
    
    <div className='nav-gradient'>
      <Navbar/>
      <div className='gradient flex justify-center p-4 gap-8 flex-wrap'>
        <CurrentInfo/>
        <UpdateInfo/>
      </div>
      <Footer/>
    </div>
    </>
  )
}

export default Profile
