import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//import AuthContext from '../../context/auth/authContext';
//import ContactContext from '../../context/contact/contactContext';

import CarIcon from './CarIcon.js';

const Navbar = () => {

  const onLogout = () => {
    alert('logout')
  }

  const authLinks = (
    <div className='flex'>
      <li className='px-5'>
        Hello User
            </li>
      <li>
        <a onClick={onLogout} href='#!'>Logout</a>
      </li>
    </div>
  )

  const guestLinks = (
    <ul className='flex justify-end'>
      <li className='px-5 text-white'>
        <Link to="/register" >Register</Link>
      </li>

      <li>
        <Link to="/login" className='text-white'>Login</Link>
      </li>
    </ul>
  )


  return (
    <div className="bg-blue-500 w-full h-20 flex items-center flex-wrap">
      <div className="flex w-full px-5 justify-center border-b md:w-1/3 md:border-none md:px-5">
        <CarIcon />
        <span className='text-2xl text-white italic'>Connected Cars</span>
      </div>
      <div className="flex w-full justify-center md:w-2/3 md:justify-end md:pr-10">
        {!true ? authLinks : guestLinks}
      </div>
    </div >
  )
}

export default Navbar;