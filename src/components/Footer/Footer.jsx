import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer' id='contact'>
      <div className="footer-content">
        <div className='footer-content-left'>
            <img src={assets.red_logo}/>
            <p>La FAST-FOOD găsești mixul perfect între gust, viteză și varietate — tot ce-ți trebuie pentru o masă delicioasă, livrată direct la ușă. Fie că îți e poftă de burgeri suculenți, cartofi crocanți, porții consistente, sosuri savuroase sau deserturi care îți fac ziua mai bună — Fast food e alegerea ideală.</p>
            <div className="footer-social-icons">
                <a href='https://www.facebook.com/' target='_blank'><img src={assets.fb_logo} alt="" /></a>
                <a href='https://www.instagram.com/' target='_blank'><img src={assets.ig_logo} alt="" /></a>
                <a href='https://www.tiktok.com/' target='_blank'><img src={assets.tt_logo} alt="" /></a>
            </div>
        </div>
        <div className='footer-content-center'>
            <h2>Fast food</h2>
            <ul>
                <li><NavLink to='/'>Acasa</NavLink></li>
                <li><NavLink to='/info#despre-noi' target='_blank'>Despre noi</NavLink></li>
                <li><NavLink to='/info#livrare' target='_blank'>Livrare</NavLink></li>
                <li><NavLink to='/info#termeni' target='_blank'>Privacy policy</NavLink></li>
            </ul>
        </div>
        <div className='footer-content-right'>
            <h2>Ia legatura cu noi</h2>
            <ul>
                <li>
                  <a href="tel:+4071313131">{assets.contact}</a>
                </li>
                <li>
                  <a href={`mailto:${assets.email}`}>{assets.email}</a>
                </li>
                <li><a 
                  href='https://www.google.com/maps/' 
                  target='_blank'>📍Str. milfs nr 13</a></li>
                <li><a 
                  href='https://www.google.com/maps' 
                  target='_blank'>📍Str. typeshit nr 31</a></li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2025 &#x2117; Fast-food``.com - All rights reserved.</p>
    </div>
  )
}

export default Footer
