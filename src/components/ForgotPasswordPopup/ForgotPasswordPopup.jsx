import React, { useContext, useState } from 'react'
import './ForgotPasswordPopup.css'
import { assets } from '../../assets/assets.js'
import axios from 'axios';
import { Context } from '../../context/Context.js';
import { toast } from 'react-toastify';


const ForgotPasswordPopup = ({setShowForgotPassword}) => {

  const {url} = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');
  const [data, setData] = useState({
    email: "",
    password: "",
    verifyPassword: "",
  })

  const onChangeHandler = (event) => {
    const {name, value} = event.target
    setData((prev) => ({...prev, [name]: value}))
  }

  const ChangePassword = async (event) => {
    setLoading(true);
    event.preventDefault();
    if(!data.email || !data.password || !data.verifyPassword){
        setErrors(`Toate campurile trebuie completate.`);
    } 
    else if(data.password === data.verifyPassword){
        try{
            const response = await axios.post(`${url}/api/user/forgotpassword`, {email: data.email, password: data.password}, {withCredentials: true});
            if(response.data.success){
                setShowForgotPassword(false);
                toast.success(response.data.message);
            }else
                setErrors(response.data.message);
        }catch(er){
            console.log(er);
            if (er.response && er.response.status === 429) {
                setErrors(er.response.data.message || "Prea multe incercari. Incearca mai tarziu.");
                toast.error(er.response.data.message || "Prea multe incercari. Incearca mai tarziu.");
            } else {
                console.log(er);
                toast.error(`A apărut o eroare. Vă rugăm să încercați din nou mai târziu.`);
            }
        }
    } else{
        setErrors('Parolele nu se potrivesc.')
    }
    setLoading(false);
  }

  return (
    <div className='change-password-popup'>
          <form action='' className='change-password-container' onSubmit={(event) => ChangePassword(event)}>
            <div className="change-password-popup-title">
                <h2>Schimba parola</h2>
                <img onClick={() => setShowForgotPassword(false)} src={assets.cross_icon} alt='' />
            </div>
            <p className='change-password-popup-info'>Un mail de verificare va fi trimis dupa completarea campurilor.</p>
            <div className='change-password-popup-inputs'>
                <input onChange={onChangeHandler} value={data.email} type='text' name='email' required placeholder='Emailul contului'/>
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

export default ForgotPasswordPopup
