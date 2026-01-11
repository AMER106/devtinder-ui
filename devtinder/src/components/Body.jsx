import React from 'react'

import { Outlet } from 'react-router-dom'
import  NavBar  from './NavBar';
import Footer from './Footer';

const Body = () => {
  return (
    <div>
    <NavBar/>
    hello from body
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body;
