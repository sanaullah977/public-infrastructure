import React from 'react'
import Logo from '../../Component/Logo/Logo'
import { Outlet } from 'react-router'
import Navber from '../../Component/Navber/Navber'

const AuthLayout = () => {
  return (
    <div>
        <Navber></Navber>
        <Outlet></Outlet>
      
    </div>
  )
}

export default AuthLayout
