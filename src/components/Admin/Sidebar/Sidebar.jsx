import React, { useContext } from 'react'
import './Sidebar.css'
import { assets } from '../../../assets/assets'
import { NavLink } from 'react-router-dom'
import { Context } from '../../../context/Context'

const Sidebar = () => {
  const {userRole} = useContext(Context);
  return (
    <div className='sidebar'>
      <div className='sidebar-options-top-spacing' />

      {
        userRole === 'admin' ? 
        <NavLink 
          to='/admin/add' 
          className={({ isActive }) => `sidebar-option ${isActive ? 'sidebar-option-active' : ''}`}
        >
          <img src={assets.add_icon} className="sidebar-option-img" />
          <h3 className="sidebar-option-title">Adauga</h3>
        </NavLink> : null
      }

      {
        userRole === 'admin' ? 
        <NavLink 
          to='/admin/list' 
          className={({ isActive }) => `sidebar-option ${isActive ? 'sidebar-option-active' : ''}`}
        >
          <img src={assets.order_icon} className="sidebar-option-img" />
          <h3 className="sidebar-option-title">Produse</h3>
        </NavLink> : null
      }

      {
        userRole === 'admin' ? 
        <NavLink 
          to='/admin/users' 
          className={({ isActive }) => `sidebar-option ${isActive ? 'sidebar-option-active' : ''}`}
        >
          <img src={assets.user_icon} className="sidebar-option-img" />
          <h3 className="sidebar-option-title">Utilizatori</h3>
        </NavLink> : null
      }

      <NavLink 
        to='/admin/orders' 
        className={({ isActive }) => `sidebar-option ${isActive ? 'sidebar-option-active' : ''}`}
      >
        <img src={assets.order_icon} className="sidebar-option-img" />
        <h3 className="sidebar-option-title">Comenzi</h3>
      </NavLink>
    </div>
  )
}

export default Sidebar
