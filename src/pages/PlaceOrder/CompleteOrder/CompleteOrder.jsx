import { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { useLocation, useNavigate,  } from 'react-router-dom'
import {Context} from '../../../context/Context.js';
import './CompleteOrder.css';

const CompleteOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");
  const {url} = useContext(Context);
  const [loading, setLoading] = useState(true)
  const [paid, setPaid] = useState(false)

  useEffect(() => {
    axios.get(`${url}/check-payment/${sessionId}`).then((res) => {
      setPaid(res.data.paid)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className='error-text-div'>
      <h2>Se verifica plata...</h2>
      <button onClick={() => navigate('/')} className='pagina-principala-buton'>Pagina Principala</button>
    </div>

  if (!paid) return <div className='error-text-div'>
    <h2>Plata nu este confirmata inca!</h2>
    <button onClick={() => navigate('/')} className='pagina-principala-buton'>Pagina Principala</button>
  </div>

  return (
    <div className="complete-container">
      <img src="https://cdn-icons-png.flaticon.com/512/845/845646.png"/>
      <h1>Plata finalizata!</h1>
      <p>Multumim pentru comanda.</p>
      <button onClick={() => navigate('/orders')} className='pagina-principala-buton'>Comenzi</button>
    </div>
  )
}

export default CompleteOrder;