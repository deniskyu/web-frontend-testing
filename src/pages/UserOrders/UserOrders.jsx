import React, { useContext, useEffect, useState } from 'react'
import './UserOrders.css'
import { Context } from '../../context/Context.js'
import { assets } from '../../assets/assets.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosAuthGuard from '../../helpers/AxiosAuthGuard.js';

const UserOrders = () => {
  const navigate = useNavigate();
  const {url, orders, itemList, username, loadUserOrders} = useContext(Context);
  const [comenziActualeBool, setComenziActualeBool] = useState(false);
  const [comenziVechiBool, setComenziVechiBool] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if(orders.filter(order => order.status === 'Livrata').length > 0)
        setComenziVechiBool(true);
    else
        setComenziVechiBool(false);
    if(orders.filter(order => order.status !== 'Livrata').length > 0)
        setComenziActualeBool(true);
    else
        setComenziActualeBool(false);
  }, [orders]);

  const trackOrder = async () => {
    setLoading(true);
    await loadUserOrders();
    setLoading(false);
  }

  const removeOrder = async (orderId) => {
    setLoading(true);
    try{
        const response = await axiosAuthGuard.post(`/api/user/orders/remove`, {orderId});
        if(response.data.success){
            toast.success(response.data.message);
            await loadUserOrders();
        }else{
            toast.error(response.data.message);
            await loadUserOrders();
        }
    }catch(er){
        console.log(er);
        toast.error(`A apărut o eroare. Vă rugăm să încercați din nou mai târziu.`);
    }
    setLoading(false);
  }

  return (
    <div className='user-orders'>
        <div className='user-orders-text'>
            <h1>Comenzile tale</h1>
            <p>Aici poți vedea toate comenzile tale plasate recent și statusul fiecăreia.</p>
        </div>
        {
            <div className='user-orders-orders'>
                <h2 className='user-orders-order-h2'>Comenzile actuale</h2>
                {
                    !comenziActualeBool ? <p className='user-orders-none-p'>Momentan nu ai nici o comanda.</p> : null
                }
                {
                    orders.map((item, idx) => {
                        if(item.status==='Livrata')
                            return null;
                        const a = item.address ?? {};
                        const addressString =  
                          `${a.localitate}, ${a.strada} nr${a.numar}` +
                          (a.cladire ? `, ${a.cladire}` : "") +
                          (a.scara ? `, Sc. ${a.scara}` : "") +
                          (a.apartament ? `, Ap. ${a.apartament}` : "") +
                          (`, ${a.telefon}, taxa livrare: ${item.deliveryFee} lei`);
            
            
                        const itemsString = item.orderItems.map(([id, qty]) => {
                          const item = itemList.find(i => i._id === id);
                          return item ? `${item.name} x${qty}` : "";
                        }).join(", ")

                        return(
                            <div className='user-order-div' key={idx}>
                                <div className='user-order-table user-order-table-title'>
                                    <p>Status</p>
                                    <p>Detalii</p>
                                    {
                                        item.status === 'In procesare' ? <p>Sterge</p> : null
                                    }
                                </div>
                                <div className={item.status === 'In procesare' ? 'user-order-table' :'user-order-table-old'}>
                                    <img src={assets.delivery_bike} className='user-orders-delivery-logo' />
                                    <div className='user-order-status'>
                                        <p  key={item.status + Date.now()} >{item.status}</p>
                                        <button onClick={() => loading ? null : trackOrder()}>Track</button>
                                    </div>
                                    <div className='user-order-info'>
                                        <div>
                                            <p><span>Adresa: </span>{addressString}</p>
                                            <p><span>Produse: </span>{itemsString}</p>
                                        </div>
                                        <div>
                                            <p><span>Plata: </span>{item.paymentMethod.toUpperCase()}</p>
                                            <p><span>Total: </span>{item.amount + item.deliveryFee} lei</p>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            item.status === 'In procesare' ? <p onClick={() => loading ? null : removeOrder(item._id)} className='user-orders-cross'>x</p> : null
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <div style={{marginTop: '30px'}}/>
                {!comenziActualeBool && !comenziVechiBool ? null : <h2 className='user-orders-order-h2'>Comenzile anterioare</h2>}
                {
                    comenziVechiBool ? null 
                    : !comenziActualeBool && !comenziVechiBool ? null : <p className='user-orders-none-p'>Momentan nu ai nici o comanda.</p> 
                }
                {
                    orders.map((item, idx) => {
                        if(item.status !== 'Livrata')
                            return null;
                        const a = item.address ?? {};
                        const addressString =  
                            `${a.localitate}, ${a.strada} nr${a.numar}` +
                            (a.cladire ? `, ${a.cladire}` : "") +
                            (a.scara ? `, Sc. ${a.scara}` : "") +
                            (a.apartament ? `, Ap. ${a.apartament}` : "") +
                            (`, ${a.telefon}, taxa livrare: ${item.deliveryFee} lei`);
            
            
                        const itemsString = item.orderItems.map(([id, qty]) => {
                            const item = itemList.find(i => i._id === id);
                            return item ? `${item.name} x${qty}` : "";
                        }).join(", ")

                        return(
                            <div className='user-order-div' key={idx}>
                                <div className='user-order-table user-order-table-title'>
                                    <p>Status</p>
                                    <p>Info</p>
                                </div>
                                <div className='user-order-table-old'>
                                    <img src={assets.delivery_bike} className='user-orders-delivery-logo' />
                                    <div className='user-order-status'>
                                        <p>{item.status}</p>    
                                    </div>
                                    <div className='user-order-info'>
                                        <div className='user-order-info-old-long'>
                                            <p><span>Adresa: </span>{addressString}</p>
                                            <p><span>Produse: </span>{itemsString}</p>
                                        </div>
                                        <div>
                                            <p><span>Plata: </span>{item.paymentMethod.toUpperCase()}</p>
                                            <p><span>Total: </span>{item.amount + item.deliveryFee} lei</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        }
        {<div className='user-orders-bottom-text'>
            <p>Comenzile pot fi anulate doar în stadiul de procesare. Odată ce acestea au intrat în pregătire sau livrare, anularea nu mai este posibilă.</p>
            <p>Pentru protejarea datelor tale și optimizarea sistemului, comenzile sunt eliminate automat din baza noastră de date după o perioadă de 3 luni.</p>
            <p>Întâmpini vreo problemă? Sună la {assets.contact}</p>
        </div>}
    </div>
  )
}

export default UserOrders
