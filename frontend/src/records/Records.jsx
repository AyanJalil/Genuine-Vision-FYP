import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Records_table from '../components/Records_table'

const Records = () => {
  return (
    <>
    <div className="nav-gradient">
        <Navbar/>
        <div className="gradient">
            <Records_table/>
        </div>
        <Footer/>
    </div>
    </>
  )
}

export default Records
