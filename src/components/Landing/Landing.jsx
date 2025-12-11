import React from 'react'
import './Landing.css'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className='landing' id='landing'>
      <div className='landing-container'>
        <h1 className='landing-header'>Cele mai bune produse in preajma ta</h1>
        <p className='landing-p'>La FAST-FOOD, burgerii nu sunt doar o masă — sunt plăcerea care îți face ziua mai bună. Cu carne suculentă, chifle pufoase, toppinguri generoase și sosuri care creează dependență, burgerii noștri sunt făcuți să-ți trezească pofta încă din clipa în care îi vezi în meniu.</p>
        <button className='landing-button' onClick={() => navigate('/info#despre-noi')}> Despre noi</button>
      </div>
    </div>
  )
}

export default Landing
