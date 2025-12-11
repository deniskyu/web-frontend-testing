import React, { useState, useEffect, useContext } from 'react'
import './ChangePasswordPopup.css'
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import axiosAuthGuard from '../../helpers/AxiosAuthGuard.js';
import { Context } from '../../context/Context.js';

const ChangePasswordPopup = ({setShowChangePassword}) => {

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');
  const [verifyMail, setVerifyMail] = useState(false);
  const [data, setData] = useState({
    password: "",
    verifyPassword: "",
  });
  const {url} = useContext(Context);

  const onChangeHandler = (event) => {
    const {name, value} = event.target
    setData((prev) => ({...prev, [name]: value}))
  }

  const ChangePassword = async (event) => {
    setLoading(true);
    setErrors('');
    event.preventDefault()
    if(!data.password || !data.verifyPassword){
      setErrors(`Toate campurile trebuie completate.`);
    }
    else if(data.password === data.verifyPassword){
      try{
          const response = await axiosAuthGuard.post(`/api/user/changepassword`, {newPassword: data.password});
          if(response.data.success){
              setVerifyMail(true);
          }else{
              setErrors(response.data.message);
          }
      }catch(er){
        if (er.response && er.response.status === 429) {
          setErrors(er.response.data.message || "Prea multe incercari. Incearca mai tarziu.");
          toast.error(er.response.data.message || "Prea multe incercari. Incearca mai tarziu");
        } else {
          console.log(er);
          toast.error(`A apărut o eroare. Vă rugăm să încercați din nou mai târziu.`);
        }
      }
    }else{
      setErrors('Parolele nu se potrivesc.');
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!verifyMail) return;
  
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.post(`${url}/api/user/verify/change-password/close`, {newPassword: data.password}, {withCredentials: true});
        if (response.data.success) {
          toast.success(`Parola a fost schimbata cu succes.`);
          setVerifyMail(false);
          setShowChangePassword(false);
          clearInterval(intervalId);
        }
      } catch (err) {console.log(err)}
    }, 4000); // la 4 secunde
  
    return () => clearInterval(intervalId);
  }, [verifyMail]);

  return (
    verifyMail ? <div className='change-password-popup'>
        <div className='verify-mail-div'>
            <h1>Verifica-ti emailul pentru a continua</h1>
            <button onClick={() => setVerifyMail(false)}>Inapoi</button>
        </div>
    </div>
    :<div className='change-password-popup'>
      <form action='' className='change-password-container' onSubmit={(event) => ChangePassword(event)}>
        <div className="change-password-popup-title">
            <h2>Schimba parola</h2>
            <img onClick={() => setShowChangePassword(false)} src={assets.cross_icon} alt='' />
        </div>
        <p className='change-password-popup-info'>Un mail de verificare va fi trimis dupa completarea campurilor.</p>
        <div className='change-password-popup-inputs'>
            <input onChange={onChangeHandler} value={data.password} type='password' name='password' required placeholder='Parola noua'/>
            <input onChange={onChangeHandler} value={data.verifyPassword} type='password' name='verifyPassword' required placeholder='Repeta parola'/>
        </div>
        <button>{loading ? '...' : 'Schimba parola'}</button>
        {
            errors ? <p style={{color: 'red', textAlign: 'center', marginTop: '-15px'}}>{errors}</p> : null
        }
      </form>
    </div>
  )
}

export default ChangePasswordPopup
