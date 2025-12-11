import React, { useContext, useState, useEffect, useRef } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets';
import { useNavigate, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Context } from '../../context/Context.js';
import axiosAuthGuard from '../../helpers/AxiosAuthGuard.js';


const Navbar = ({setShowLogin, setShowChangePassword}) => {

  const navigate = useNavigate();

  const [menu, setMenu] = useState("home");
  const [loading, setLoading] = useState(false);
  const {username, loadUserInfo, cart, cartContain, loadingUser, orders, loadUserOrders} = useContext(Context);
  const [cartBool, setCartBool] = useState({});
  const [openDropdown, setOpenDropdown] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const addToCart = async () => {
      const result = await cartContain();
      setCartBool(result);
    }
    addToCart();
  }, [cart])

  const logOut = async () => {
    setLoading(true);
    try{
      const response = await axiosAuthGuard.post('/api/user/logout', {});
      if(response.data.success){
        toast.success(response.data.message);
        await loadUserInfo();
        await loadUserOrders();
      }
      else
        toast.error(response.data.message);
    }catch(er){
      console.log(er);
      toast.error('A apărut o eroare. Vă rugăm să încercați din nou mai târziu.');
    }
    setLoading(false);
  }

  return (
    <div className='navbar'>
      <NavLink to='/admin'><img src={assets.logo} className='navbar-logo'/></NavLink>
      <div className='navbar-buttons-container'>
        <NavLink to='/#landing' onClick={() => setMenu('home')} className={`navbar-buttons ${menu==='home'?'active-button':''}`}>Acasa</NavLink>
        <NavLink to='/#meniu'onClick={() => setMenu('meniu')} className={`navbar-buttons ${menu==='meniu'?'active-button':''}`}>Meniu</NavLink>
        <NavLink to='/#recenzii'onClick={() => setMenu('recenzii')} className={`navbar-buttons ${menu==='recenzii'?'active-button':''}`}>Recenzii</NavLink>
        <NavLink to='/#contact'onClick={() => setMenu('contact')} className={`navbar-buttons ${menu==='contact'?'active-button':''}`}>Contact</NavLink>
      </div>
      <div className='navbar-right-container'>
        <div className='navbar-basket'>
          <img className='navbar-orders-icon' src={assets.orders_image} onClick={() => username ? navigate('/orders') : setShowLogin(true)}/>
          {
            orders.length === 0 ? null : 
            <div className="navbar-basket-dot"></div>
          }
        </div>
        <div className='navbar-basket'>
          <img src={assets.basket_icon} onClick={() => username ? navigate('/cart') : setShowLogin(true)} />
          {
            !cartBool ? null : 
            <div className="navbar-basket-dot"></div>
          }
        </div>
        {loadingUser ? null : username ? (
          <div 
            className='navbar-username-div'
            ref={dropdownRef}
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            <h3 className='navbar-username'>{username}</h3>

            {openDropdown && (
              <div className='navbar-username-dropdown'>
                <p onClick={() => setShowChangePassword(true)}>Securitate</p>
                <p onClick={() => loading?null:logOut()}>Log out</p>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>Inregistrare</button>
        )}
      </div>
    </div>
  )
}

export default Navbar
