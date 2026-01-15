import React from 'react'
import Navber from '../../Component/Navber/Navber'
import { Outlet } from 'react-router'
import Footer from '../../Component/Footer/Footer'

const RootLayouts = () => {
  return (
    <div>
      <Navber/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default RootLayouts
