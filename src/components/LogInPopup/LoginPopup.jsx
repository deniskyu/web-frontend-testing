import React, { useContext, useState, useEffect } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from '../../context/Context';
import CookieBanner from '../CookieBanner/CookieBanner';
import { NavLink } from 'react-router-dom';


const LoginPopup = ({setShowLogin, setShowForgotPassword}) => {
  const {url, loadUserInfo, cookieConsent, setCookieConsent, loadCart, loadUserOrders} = useContext(Context);
  const [currState, setCurrState] = useState('Sign Up');
  const [loading, setLoading] = useState(false);
  const [verifyMail, setVerifyMail] = useState(false);
  const [errors, setErrors] = useState('');
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    verifyPassword: '',
    terms: false,
  });

  const onChangeHandler = (event) => {
    const {name, value} = event.target
    setData((prev) => ({...prev, [name]: value}))
  }

  const logIn = async (event) => {
    setLoading(true);
    setErrors('');
    event.preventDefault()
    try{
        const response = await axios.post(`${url}/api/user/login`, data, {withCredentials: true});
        if(response.data.success) {
            toast.success(response.data.message);
            setShowLogin(false);
            await loadUserInfo();
            await loadUserOrders();
        }
        else {
            setErrors(response.data.message);
        }
    }catch(er){
        if (er.response && er.response.status === 429) {
          setErrors(er.response.data.message || "Prea multe incercari. Incearca mai tarziu.");
          toast.error(er.response.data.message || "Prea multe incercari. Incearca mai tarziu.");
        } else {
          console.log(er);
            toast.error(`A apărut o eroare. Vă rugăm să încercați din nou mai târziu.`);
        }
    }
    setLoading(false);
  };

  const signUp = async (event) => {
    setLoading(true);
    setErrors('');
    event.preventDefault();
    if(!data.terms) {
        setErrors('Termenii si conditiile trebuie aprobate.');
        setLoading(false);
        return;
    };
    if(data.password !== data.verifyPassword) {
        setErrors('Parolele sunt diferite.');
        setLoading(false);
        return;
    };
    try{
        const response = await axios.post(`${url}/api/user/register`, data, {withCredentials: true});
        if(response.data.success)
            setVerifyMail(true);
        else{
            setErrors(response.data.message);
        }
    }catch(er){
        console.log(er);
        toast.error(`A apărut o eroare. Vă rugăm să încercați din nou mai târziu.`);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!verifyMail) return;
  
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.post(`${url}/api/user/verify/close`, {email: data.email}, { withCredentials: true });
        if (response.data.success) {
          toast.success(`Contul a fost inregistrat cu succes.`);
          setVerifyMail(false);
          setCurrState('Login');
          clearInterval(intervalId);
        }
      } catch (err) {}
    }, 4000); // la 4 secunde
  
    return () => clearInterval(intervalId);
  }, [verifyMail]);
  
  
  if(cookieConsent === 'accepted')
    return (
      verifyMail ? <div className='login-popup'>
          <div className='verify-mail-div'>
              <h1>Verifica-ti emailul pentru a continua</h1>
              <button onClick={() => setVerifyMail(false)}>Inapoi</button>
          </div>
      </div>
      : <div className='login-popup'>
        <form action='' className='login-popup-container' onSubmit={(event) => {
          if (loading) return;
          if (currState === "Sign Up") {
            signUp(event);
          } else {
            logIn(event);
          }
        }}>
          <div className="login-popup-title">
              <h2>{currState}</h2>
              <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='' />
          </div>
          <div className="login-popup-inputs">
              {
                  currState === 'Sign Up' ? <input onChange={onChangeHandler} value={data.username} name='username' type='text' placeholder='Numele tau' required/> : null
              }
              <input onChange={onChangeHandler} value={data.email} name='email' type='email' placeholder='Emailul' required/>
              <input onChange={onChangeHandler} value={data.password} name='password' type='password' placeholder='Parola' required/>
              {
                  currState === 'Sign Up' ? <input onChange={onChangeHandler} value={data.verifyPassword} name='verifyPassword' type='password' placeholder='Repeta parola' required/> : null
              }
          </div>
          {
            loading ? <button>...</button>
            : <button>{currState === 'Sign Up' ? 'Creează cont' : 'Autentifică-te'}</button>
          }
          {
              errors ? <p style={{color: 'red', textAlign: 'center', marginTop: '-15px'}}>{errors}</p> : null
          }
          <div className="login-popup-condition">
              {
                  currState === 'Sign Up' ? <>
                      <input onChange={() => setData((prev) => ({...prev, terms: !prev.terms}))} checked={data.terms} type="checkbox" name='terms' required/> 
                      <p>Continuând, sunt de acord cu <NavLink to='/info#termeni' target='_blank' style={{color: 'tomato', cursor: 'pointer'}}>termenii de utilizare și politica de confidențialitate</NavLink>.</p>
                  </>
                  : <>
                  </>
              }
          </div>
          {
              currState === 'Sign Up' ? <p>Ai deja un cont? <span onClick={() => setCurrState('Login')}>Apasa aici</span></p>
              : <p>Vrei un cont nou? <span onClick={() => setCurrState('Sign Up')}>Apasa aici</span></p>
          }
          {
            currState === 'Sign Up' ? null 
            : <p className='forgot-password-text'><span onClick={() => {
                setShowLogin(false); 
                setShowForgotPassword(true)}}>
              Ti-ai uitat parola?</span></p>
          }
        </form>
      </div>
    )
    else{
      setCookieConsent(false);
      localStorage.removeItem("cookieConsent");
      setShowLogin(false);
      return null;
    }
    
}

export default LoginPopup
