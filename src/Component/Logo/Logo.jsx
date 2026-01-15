import React from 'react'
import Icon from '../../assets/A flat vector icon f.png'

const Logo = () => {
  return (
    <div className='flex gap-1 items-center'>
      <img className='h-18' src={Icon} alt="" />
      <p className='font-bold'>Civic<span className='text-amber-600 font-bold'>Build</span></p>
    </div>
  )
}

export default Logo
