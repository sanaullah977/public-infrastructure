import React from 'react'
import Logo from '../Logo/Logo'
import Icon from '../../assets/A flat vector icon f.png'

const Footer = () => {
  return (
    <div >
      <footer className="footer items-center sm:footer-horizontal bg-base-200 text-base-content p-10">
  <div className='flex gap-1 items-center'>
                   <img className='h-16' src={Icon} alt="" />
                   <p className='font-bold text-lg'>Civic<span className='text-amber-600 font-bold'>Build</span></p>
                 </div>
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
<footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
  <aside>
    <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
  </aside>
</footer>
    </div>
  )
}

export default Footer
