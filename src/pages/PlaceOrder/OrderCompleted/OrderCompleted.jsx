import React from 'react'
import './OrderCompleted.css'
import { useNavigate } from 'react-router-dom'

const OrderCompleted = () => {
    const navigate = useNavigate();
    return (
        <div className="complete-container">
          <img src="https://cdn-icons-png.flaticon.com/512/845/845646.png"/>
          <h1>Comanda finalizata!</h1>
          <p>Multumim ca ai ales fast-food.</p>
          <button onClick={() => navigate('/orders')} className='pagina-principala-buton'>Comenzi</button>
        </div>
      )
}

export default OrderCompleted
