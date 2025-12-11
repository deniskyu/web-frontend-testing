import React, {useContext, useEffect, useState} from 'react'
import './Orders.css'
import {assets} from '../../../assets/assets.js'
import axiosAuthGuard from '../../../helpers/AxiosAuthGuard.js'
import { Context } from '../../../context/Context.js'
import { toast } from 'react-toastify'

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [toggle, setToggle] = useState('newOrders');
  const [searchText, setSearchText] = useState('');
  const [orderToDelete, setOrderToDelete] = useState('');
  const [youSure, setYouSure] = useState(false);
  const {url, itemList} = useContext(Context);
  const [newOrdersBool, setNewOrdersBool] = useState(false);
  const [oldOrdersBool, setOldOrdersBool] = useState(false);

  const removeOrder = async () => {
    setYouSure(false);
    setLoading(true);
    try{
      const response = await axiosAuthGuard.post(`/api/orders/delete`, {orderId: orderToDelete});
      if(response.data.success){
        toast.success(response.data.message);
        await fetchOrders();
      }
      else
        toast.error(response.data.message);
    }catch(er){
      console.log(er);
      toast.error(`A apărut o eroare. Vă rugăm să încercați din nou mai târziu.`);
    }
    setLoading(false);
  };

  const changeStatus = async (orderId, statusValue) => {
    setLoading(true);
    try{
      const response = await axiosAuthGuard.post(`/api/orders/change-status`, {orderId, statusValue});
      if(response.data.success){
        toast.success(response.data.message);
        await fetchOrders();
      }else
        toast.error(response.data.message);
    }catch(er){
      console.log(er);
      toast.error(`A apărut o eroare. Vă rugăm să încercați din nou mai târziu.`);
    }
    setLoading(false);
  }

  const popup = async (orderId) => {
    setYouSure(true);
    setOrderToDelete(orderId);
  }

  const fetchOrders = async () => {
    try {
      const response = await axiosAuthGuard.post(`/api/orders/get`, {});
      if (response.data.success) {
        const list = response.data.ordersList;
        setOrders(list);

        const hasNew = list.some(order => order.status !== "Livrata");
        const hasOld = list.some(order => order.status === "Livrata");
  
        setNewOrdersBool(hasNew);
        setOldOrdersBool(hasOld);
  
        setErrorText("");
  
      } else {
        setOrders([]);
        setNewOrdersBool(false);
        setOldOrdersBool(false);
        setErrorText("Nicio comanda gasita.");
      }
    } catch (er) {
      setOrders([]);
      setNewOrdersBool(false);
      setOldOrdersBool(false);
      setErrorText("Nicio comanda gasita.");
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch imediat la montarea componentei
  
    const interval = setInterval(() => {
      fetchOrders();
    }, 10000); // 10 secunde
  
    return () => clearInterval(interval); // curățare la demontare
  }, []);
  

  return (
    <div className='orders add flex-col'>
      {youSure && (
        <div className="orders-popup-overlay">
          <div className="orders-popup">
            <h3>Sigur vrei să ștergi comanda?</h3>
            <p>Această acțiune este ireversibilă.</p>

            <div className="orders-popup-buttons">
              <button className="orders-btn-cancel" onClick={() => setYouSure(false)}>
                Anulează
              </button>

              <button className="orders-btn-delete" onClick={() => loading ? null : removeOrder()}>
                Șterge
              </button>
            </div>
          </div>
        </div>
      )}
      <div className='list-toggle-div'>
        <div
          className={`list-toggle-box ${toggle === 'newOrders' ? 'list-toggle-active' : ''}`}
          onClick={() => toggle === 'newOrders' ? null : setToggle('newOrders')}
        >
          <p>Comenzi de livrat</p>
        </div>

        <div
          className={`list-toggle-box ${toggle === 'oldOrders' ? 'list-toggle-active' : ''}`}
          onClick={() => toggle === 'oldOrders' ? null : setToggle('oldOrders')}
        >
          <p>Comenzile livrate</p>
        </div>
      </div>
      <div className='list-items-search-div'>
        <input onChange={(e) => setSearchText(e.target.value)} className='list-items-search-input'type='text' placeholder='Cauta dupa email'/>
      </div> 
      {
        toggle === 'oldOrders' 
        ? searchText === '' ? <h2 className='admin-users-list-total'>{orders.filter(order => order.status === 'Livrata').length} results</h2>
        : <h2 className='admin-users-list-total'>{orders.filter(order => order.status === 'Livrata').filter(order => order.email.toLowerCase().includes(searchText.toLowerCase())).length} results</h2>
        : null
      }
      {
        toggle === 'oldOrders' 
        ? <p className='orders-comenzile-p'>Comenzile se sterg automat dupa 3 luni.</p>
        : null
      }
      <div className='orders-table'>
        <div className='orders-table-format orders-table-title'>
          <p>Email</p>
          <p>Info/Status</p>
          <p>Sterge</p>
        </div>
        { errorText ? <div style={{margin: '20px', placeSelf: 'center'}}>
          <p style={{color: 'gray'}}>{errorText}</p>
        </div> :
          orders.map((item, idx) => {
            if(toggle==='newOrders')
              if(item.status === 'Livrata')
                return null;
            if(toggle==='oldOrders')
              if(item.status !== 'Livrata')
                return null;
            const a = item.address ?? {};
            const addressString =  
              `Latitudine/Longitudine: ${a.lat}, ${a.lng}, ${a.localitate}, ${a.strada} nr${a.numar}` +
              (a.cladire ? `, ${a.cladire}` : "") +
              (a.scara ? `, Sc. ${a.scara}` : "") +
              (a.apartament ? `, Ap. ${a.apartament}` : "") +
              (`, taxa livrare: ${item.deliveryFee} lei`);


            const itemsString = item.orderItems.map(([id, qty]) => {
              const item = itemList.find(i => i._id === id);
              return item ? `${item.name} x${qty}` : "";
            }).join(", ")

            return(
              !searchText ?
              <div className='orders-table-format' key={idx}>
                <div>
                  <img src={assets.delivery_bike}/>
                  <p>{item.email}</p>
                  <p>{item.address.telefon}</p>
                </div>
                <div className='orders-table-info-div'>
                  <div>
                    <p><span>Adresa: </span>{addressString}</p>
                    <p><span>Produse: </span>{itemsString}</p>
                  </div>
                  <div>
                    <p><span>Plata: </span>{item.paymentMethod.toUpperCase()}</p>
                    <p><span>Total: </span>{item.amount + item.deliveryFee} lei</p>
                  </div>
                  <div>
                    <select
                      value={item.status} 
                      onChange={(e) => changeStatus(item._id, e.target.value)}
                      disabled={loading} // optional
                    >
                      <option value="In procesare">In procesare</option>
                      <option value="In pregatire">In pregatire</option>
                      <option value="In curs de livrare">In curs de livrare</option>
                      <option value="Livrata">Livrata</option>
                    </select>
                  </div>
                </div>
                <div className='orders-table-cross-div'>
                  <p onClick = {() => loading ? null : popup(item._id)}>x</p>
                </div>
              </div>
              : item.email.toLowerCase().includes(searchText.toLowerCase()) ?
                <div className='orders-table-format' key={idx}>
                  <div>
                    <img src={assets.delivery_bike}/>
                    <p>{item.email}</p>
                  </div>
                  <div className='orders-table-info-div'>
                    <div>
                      <p><span>Adresa: </span>{addressString}</p>
                      <p><span>Comanda: </span>{itemsString}</p>
                    </div>
                    <div>
                      <p><span>Plata: </span>{item.paymentMethod.toUpperCase()}</p>
                      <p><span>Total: </span>{item.amount + item.deliveryFee} lei</p>
                    </div>
                    <div>
                      <select
                        value={item.status} 
                        onChange={(e) => changeStatus(item._id, e.target.value)}
                        disabled={loading} // optional
                      >
                        <option value="In procesare">In procesare</option>
                        <option value="In pregatire">In pregatire</option>
                        <option value="In curs de livrare">In curs de livrare</option>
                        <option value="Livrata">Livrata</option>
                      </select>
                    </div>
                  </div>
                  <div className='orders-table-cross-div'>
                    <p onClick = {() => loading ? null : popup(item._id)}>x</p>
                  </div>
              </div>
              : null
            )
          })
        }
      </div>
      {
        toggle === 'newOrders' ? !newOrdersBool ? <p className='orders-no-orders-found'>Nicio comanda gasita</p> : null : null
      }
      {
        toggle === 'oldOrders' ? !oldOrdersBool ? <p className='orders-no-orders-found'>Nicio comanda gasita</p> : null : null
      }

    </div>
  )
  
}

export default Orders
