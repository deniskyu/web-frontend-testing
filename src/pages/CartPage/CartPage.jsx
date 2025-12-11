import React, { useContext, useState, useEffect } from 'react'
import './CartPage.css'
import { Context } from '../../context/Context'
import LocationPicker from '../../components/LocationPicker/LocationPicker'
import { toast } from 'react-toastify'
import axiosAuthGuard from '../../helpers/AxiosAuthGuard.js'
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets.js'


const CartPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {cart, url, itemList, removeFromCart, cartContain, username} = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [cartBool, setCartBool] = useState();

  const [address, setAddress] = useState({
    lat: "",
    lng: "",
    oras: "",
    localitate: "",
    strada: "",
    numar: "",
    cartier: "",
    cladire: "",
    scara: "",
    apartament: "",
    telefon: "",
  })

  const fetchAddress = async () => {
    try{
        const response = await axiosAuthGuard.post(`/api/user/location/get`);
        if(response.data.success && response.data.address)
            setAddress(response.data.address);
    }catch(er){}
  }

  useEffect(() => {
    fetchAddress();
  }, [])

  const saveAddress = async (e) => {
    setLoading(true);
    e.preventDefault();
    if(
        !address.lat ||
        !address.lng ||
        !address.localitate ||
        !address.strada ||
        !address.numar ||
        !address.telefon 
    ){
        toast.error('Completeaza toate campurile necesare.');
        setLoading(false);
        return;
    }
    try{
        const response = await axiosAuthGuard.post(`/api/user/location/save`, {address});
        if(response.data.success)
            toast.success('Adresa salvata cu succes.');
        else
            toast.error(response.data.message);
    }catch(er){
        toast.error('A apărut o eroare. Vă rugăm să încercați din nou mai târziu.');
    }
    setLoading(false);
  }


  const onChangeHandler = (event) => {
    const {name, value} = event.target
    setAddress((prev) => ({...prev, [name]: value}))
  }

   useEffect(() => {
      const addToCart = async () => {
        const result = await cartContain();
        setCartBool(result);
      }
      addToCart();
    }, [cart])

  const createOrder = async () => {
    setLoading(true);
    const filteredCart = Object.entries(cart)
    .filter(([id, qty]) => qty > 0);
    if(filteredCart.length === 0){
        toast.error('Niciun produs in cos.');
        setLoading(false);
        return;
    }
    try{
        if(
            !address.lat ||
            !address.lng ||
            !address.localitate ||
            !address.strada ||
            !address.numar ||
            !address.telefon 
        ){
            toast.error('Completeaza toate campurile necesare.');
            setLoading(false);
            return;
        }
        const response = await axiosAuthGuard.post(`/api/create-order`, {cartItems: filteredCart, userAddress: address});
        if(response.data.success){
            const id = response.data.orderId;
            navigate(`/cart/place-order/${id}`);
        }else{
            toast.error(response.data.message);
        }
            
    }catch(er){
        console.log(er);
        if(er.response)
            if(er.response.status === 444)
                toast.error(er.response.data.message);
            else 
                toast.error('A apărut o eroare. Vă rugăm să încercați din nou mai târziu.');
        else 
        toast.error('A apărut o eroare. Vă rugăm să încercați din nou mai târziu.');
    }
    setLoading(false);      
  }

  return (
    <div className='cart'>
        <div className='cart-items'>
            <div className="cart-items-title">
                <p>Produse</p>
                <p>Nume</p>
                <p>Pret</p>
                <p>Cantitate</p>
                <p>Total</p>
                <p>Sterge</p>
            </div>
            <br />
            <hr />
            {
                !cartBool ? <p style={{marginTop: 30, color: 'grey', fontSize: 18, textAlign: 'center'}}>Cosul tau este gol.</p> :null
            }
            {itemList.map((item, index) => {
                if(cart[item._id] > 0)
                return(
                    <div key={index}>
                        <div className='cart-items-title cart-items-item'>
                            <img src={`${url}/images/${item.image}`} alt=''/>
                            <p className='cart-items-item-name'>{item.name}</p>
                            <p>{item.price}</p>
                            <p>{cart[item._id]}</p>
                            <p>{item.price * cart[item._id]}</p>
                            <p className='cart-cross' onClick={() => removeFromCart(item._id)}>x</p>
                        </div>
                        <hr />
                    </div>
                )
            })}
        </div>

        <div className="delivery-location">
            <h2>Unde vrei să-ți livrăm comanda?</h2>
            <p>Selectează locația exact pe hartă și, dacă este nevoie, completează detaliile precum număr, bloc, scară sau apartament. Vrem să ajungem la tine fără ocolișuri. 🚗💨</p>
            <LocationPicker setAddress={setAddress} address={address} className='delivery-map'/>
            <p style={{textAlign: 'center', placeSelf: 'center', marginTop: '4px'}}>Livram pe o arie de {assets.aria_de_livrare} km, in estimativ {assets.timp_estimat_livrare}</p>
            {
                !address.oras && !address.localitate && !address.strada ? null : <form className="cart-address-form" onSubmit={(e) => loading ? null : saveAddress(e)}>
                    <h2 style={{placeSelf: 'center', margin: '10px 0'}}>Adresa ta</h2>
                    <div className='cart-address-form-one'>
                        <div className='cart-address-form-one-inner-div'>
                            <p>Localitate</p>
                            <input className='cart-address-form-set-input' value={address.localitate} name='localitate' placeholder='Localitate(oras/comuna)' type='text' onChange={() => {}} required/>
                        </div>
                        <div className="cart-address-form-one-inner-div">
                            <p>Strada</p>
                            <input className='cart-address-form-set-input' value={address.strada || ''} name='strada' placeholder="Strada" type='text' onChange={() => {}} required/>
                        </div>
                        <div className="cart-address-form-one-inner-div">
                            <p>Numar</p>
                            <input value={address.numar || ''} name='numar' placeholder="Numar" type='text' onChange={onChangeHandler} required/>
                        </div>
                    </div>
                    <div className='cart-address-form-phone-div'>
                        <p>Numar de telefon</p>
                        <input value={address.telefon} name='telefon' placeholder='Numar de telefon' type='text' onChange={onChangeHandler} required />
                    </div>
                    <h3 className='optional-text'>(Optional)</h3>
                    <div className="cart-address-form-two">
                        <div className="cart-address-form-two-inner-div">
                            <p>Bloc/cladire</p>
                            <input value={address.cladire || ''} name='cladire' placeholder="Bloc/cladire*" type='text' onChange={onChangeHandler}/>
                        </div>
                        <div className="cart-address-form-two-inner-div">
                            <p>Scara</p>
                            <input value={address.scara || ''} name='scara' placeholder="Scara*" type='text' onChange={onChangeHandler}/> 
                        </div>
                        <div className="cart-address-form-two-inner-div">
                            <p>Apartament</p>
                            <input value={address.apartament || ''} name='apartament' placeholder="Apartament*" type='text' onChange={onChangeHandler}/>
                        </div>
                    </div>
                    <button className='form-address-button' type='submit'>Salveaza adresa</button>
                </form>
            }
        </div>
        <div className="cart-button-forward-div">
            <button className='cart-button-forward' onClick={() => loading ? null : createOrder()}>Mai departe</button>
        </div>
    </div>
  )
}

export default CartPage
