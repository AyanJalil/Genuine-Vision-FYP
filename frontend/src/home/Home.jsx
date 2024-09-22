import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import React from 'react'
import Title from "../components/Title";

const Home = () => {
  return (
    <>
      <Navbar/>
      <div className="gradient">
        <Title/>
        <Footer/>
      </div>
    </>
  )
}

export default Home
