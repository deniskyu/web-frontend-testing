import React from 'react'
import './CancelOrder.css'
import { useNavigate } from 'react-router-dom';

const CancelOrder = () => {
  const navigate = useNavigate();
  return (
    <div className="cancel-container">
      <img
        src="https://cdn-icons-png.flaticon.com/512/1828/1828665.png"
        alt="Cancelled"
      />
      <h1>Plata anulata.</h1>
      <p>Comanda ta nu a fost finalizata.</p>
      <button onClick={() => navigate('/')} className='pagina-principala-buton'>Pagina Principala</button>
    </div>
  );
}

export default CancelOrder;
