import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DeepFake_Banner from '../components/DeepFake_Banner'
import DeepFake_BannerMid from '../components/DeepFake_BannerMid'

const Deepfake_detection = () => {
  return (
    <>
    <div className='nav-gradient'>
      <Navbar/>
        <div className="gradient">
          <DeepFake_Banner/>
          <DeepFake_BannerMid/>
        </div>
      <Footer/>
    </div>
      
    </>
  )
}

export default Deepfake_detection

