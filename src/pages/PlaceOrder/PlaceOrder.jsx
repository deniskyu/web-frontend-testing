import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { useNavigate, useParams } from 'react-router-dom'
import axiosAuthGuard from '../../helpers/AxiosAuthGuard'
import { Context } from '../../context/Context'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'

const PlaceOrder = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const {orderId} = useParams()
  const {url, itemList} = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [displayAddress, setDisplayAddress] = useState("");
  const [displayItems, setDisplayItems] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [details, setDetails] = useState({
    address: {
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
    },
    amount: "",
    deliveryFee: "",
    orderItems: [],
  });

  const fetchDetails = async () => {
    try{
        const response = await axiosAuthGuard.post(`/api/draft-orders/order`, {orderId});
        if(response.data.success) {
            setDetails(prev => ({
                ...prev,
                amount: response.data.orderDetails.amount,
                address: response.data.orderDetails.address,
                deliveryFee: response.data.orderDetails.deliveryFee,
                orderItems: response.data.orderDetails.orderItems,
            }));
            const a = response.data.orderDetails.address;

            setDisplayAddress(
                `${a.localitate}, ${a.strada} nr${a.numar}` +
                (a.cladire ? `, ${a.cladire}` : "") +
                (a.scara ? `, Sc. ${a.scara}` : "") +
                (a.apartament ? `, Ap. ${a.apartament}` : "") +
                (`, ${a.telefon}`)
            );
            
            setDisplayItems(
                response.data.orderDetails.orderItems.map(([id, qty]) => {
                    const item = itemList.find(i => i._id === id);
                    return item ? `${item.name} x${qty}` : "";
                }).join(", ")
            );
        }
        else{
            setErrorText(response.data.message);
        }
    }catch(er){
        console.log(er);
        setErrorText(`A apărut o eroare. Vă rugăm să încercați din nou mai târziu.`);
    }
  }

  const checkoutCard = async () => {
    setLoading(true);
    try{
        const response = await axiosAuthGuard.post(`/checkout`, {orderId});
        if(response.data.success) {
            window.location.assign(response.data.url);
        }
        else
            toast.error(response.data.message);
    }catch(er){
        console.log(er);
        toast.error('A apărut o eroare. Vă rugăm să încercați din nou mai târziu.');
    }
    setLoading(false);
  };

  const checkoutCash = async () => {
    setLoading(true);
    try{
        const response = await axiosAuthGuard.post(`/api/pay/cash`, {orderId});
        if(response.data.success){
            navigate('/order/completed');
            window.location.reload();
        }else
            toast.error(response.data.message);
    }catch(er){
        console.log(er);
        toast.error('A apărut o eroare. Vă rugăm să încercați din nou mai târziu.');
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!itemList.length) return;
    fetchDetails();
  }, [itemList]);
  

  return (
        errorText ? 
        <div className="error-text-div">
            <h2>{errorText}</h2>
            <button onClick={() => navigate('/')} className='pagina-principala-buton'>Pagina Principala</button>
        </div> 
        : <div className='main-place-order'>
            <div className="order-details">
                <div className="order-details-items">
                    <h2>Comanda:</h2>
                    <p>{displayItems}</p>
                </div>
                <div className="order-details-address">
                    <h2>Adresa:</h2>
                    <p>{displayAddress}</p>
                </div>
                <div className='order-payment-method'>
                    <h2>Metoda de plata:</h2>
                    <div className='order-payment-method-div'>
                        <div onClick={() => setPaymentMethod('cash')} className={paymentMethod === 'cash' ? 'payment-method-active' : 'order-payment-method-div-inactive'}>
                            <p>CASH</p>
                        </div>
                        <div onClick={() => setPaymentMethod('card')} className={paymentMethod === 'card' ? 'payment-method-active' : 'order-payment-method-div-inactive'}>
                            <p>CARD</p>
                        </div>
                    </div>
                </div>
                <div className="cart-bottom">
                <div className="cart-total">
                    <h2 style={{fontWeight: '700', color: "#313131"}}>Total de plata</h2>
                    <div>
                        <div className='cart-total-details'>
                            <p>Subtotal</p>
                            <p>{details.amount}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <p>Taxa de livrare</p>
                            <p>{details.deliveryFee}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <b>Total</b>
                            <b>{details.amount + details.deliveryFee}</b>
                        </div>
                    </div>
                    <button onClick={() => loading ? null : paymentMethod === 'card' ? checkoutCard() : checkoutCash()}>CHECKOUT</button>
                </div>
            </div>
            </div>
            <img src={assets.delivery_bike} className='main-place-order-image'/>
        </div>
   )
}

export default PlaceOrder
