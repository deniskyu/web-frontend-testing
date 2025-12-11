import React, { useContext } from 'react'
import './Header.css'
import { assets } from '../../../assets/assets'
import { Context } from '../../../context/Context'

const Header = () => {
  const {username} = useContext(Context);
  return (
    <div className='header'>
      <h1 className='admin-header-title'>Admin Panel</h1>
      <p className='admin-header-username'>{username}</p>
      <img src={assets.logo} className='header-logo'/>
    </div>
  )
}

export default Header
