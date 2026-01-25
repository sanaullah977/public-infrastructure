import React from 'react'
import Navber from '../../Component/Navber/Navber'
import Footer from '../../Component/Footer/Footer'
import Banner from '../../Component/Banner/Banner'
import AllIssues from '../AllIssues/AllIssues'
import LetestIssues from '../AllIssues/LetestIssues'
import { FcInspection } from "react-icons/fc";
import { FcPositiveDynamic } from "react-icons/fc";
import { FcProcess } from "react-icons/fc";

const Home = () => {
  return (
    <div className='max-w-7xl bg-amber-50 mx-auto'>
      <Banner/>
      <div className='flex justify-around mb-8`'>
        <div className='card text-center bg-white shadow-2xl p-10'>
          <span className='flex  justify-center'><FcInspection size={40} /></span>
          <h3 className='font-semibold text-xl '>Quick Reporting</h3>
          <p className='text-gray-500'>Report Issues in seconed using <br /> your Phone</p>
        </div>
        <div className='card text-center bg-white shadow-2xl p-10'>
          <span className='flex  justify-center'><FcProcess size={40} /></span>
          <h3 className='font-semibold text-xl '>Track Progress</h3>
          <p className='text-gray-500'>See updates on reported problems<br /> in real time</p>
        </div>
        <div className='card text-center bg-white shadow-2xl p-10'>
          <span className='flex  justify-center'><FcPositiveDynamic size={40} /></span>
          <h3 className='font-semibold text-xl '>Improve Your City</h3>
          <p className='text-gray-500'>Help Keep your city safe and well <br /> maintained</p>
        </div>
      </div>
      <LetestIssues/>
 

    </div>
  )
}

export default Home
