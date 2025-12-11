import React, { useContext, useEffect, useState } from 'react'
import './Users.css'
import axiosAuthGuard from '../../../helpers/AxiosAuthGuard';
import { Context } from '../../../context/Context';
import { toast } from 'react-toastify';

const Users = () => {

  const [userList, setUserList] = useState([]);
  const [currState, setCurrState] = useState("customer");
  const [searchBar, setSearchBar] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [youSure, setYouSure] = useState(false);
  const [userToDelete, setUserToDelete] = useState("");


  const {url} = useContext(Context);


  const fetchUsers = async () => {
    try{
      const response = await axiosAuthGuard.post(`/api/users/list`);
      if(response.data.success)
        setUserList(response.data.data);
      else
        toast.error('Nu am putut obtine lista utilizatorilor. Te rugam incearca mai tarziu.');
    }catch(er){
      console.log(er);
      toast.error(`A apărut o eroare. Vă rugăm să încercați din nou mai târziu.`);
    }
  }


  const changeToDelivery = async (email) => {
    setLoading(true);
    try{
      const response = await axiosAuthGuard.post(`/api/users/promote/delivery`, {email});
      if(response.data.success)
        toast.success(response.data.message);
      else
        toast.error(response.data.message);
    }catch(er){
      console.log(er);
      toast.error('A apărut o eroare. Vă rugăm să încercați din nou mai târziu.');
    }
    await fetchUsers();
    setLoading(false);
  }
 
  const changeToAdmin = async (email) => {
    setLoading(true);
    try{
      const response = await axiosAuthGuard.post(`/api/users/promote/admin`, {email});
      if(response.data.success)
        toast.success(response.data.message);
      else
        toast.error(response.data.message);
    }catch(er){
      console.log(er);
      toast.error('A apărut o eroare. Vă rugăm să încercați din nou mai târziu.');
    }
    await fetchUsers();
    setLoading(false);
  }

  const changeToCustomer = async (email) => {
    setLoading(true);
    try{
      const response = await axiosAuthGuard.post(`/api/users/demote/customer`, {email});
      if(response.data.success)
        toast.success(response.data.message);
      else
        toast.error(response.data.message);
    }catch(er){
      console.log(er);
      toast.error('A apărut o eroare. Vă rugăm să încercați din nou mai târziu.');
    }
    await fetchUsers();
    setLoading(false);
  }

  const removeUser = async (email) => {
    setLoading(true);
    try{
      const response = await axiosAuthGuard.post(`/api/users/remove`, {email});
      if(response.data.success)
        toast.success(response.data.message);
      else
        toast.error(response.data.message);
    }catch(er){
      console.log(er);
      toast.error('A apărut o eroare. Vă rugăm să încercați din nou mai târziu.');
    }
    await fetchUsers();
    setLoading(false);
  }
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const popup = (email) => {
    setUserToDelete(email);
    setYouSure(true);
  };

  const confirmDelete = async () => {
    setYouSure(false);
    await removeUser(userToDelete);
  };
  
  

  return (
    <div className='admin-users add'>
      {youSure && (
        <div className="orders-popup-overlay">
          <div className="orders-popup">
            <h3>Stergi utilizatorul?</h3>
            <p>Această acțiune este ireversibilă.</p>

            <div className="orders-popup-buttons">
              <button className="orders-btn-cancel" onClick={() => setYouSure(false)}>
                Anulează
              </button>

              <button className="orders-btn-delete" onClick={() => loading ? null : confirmDelete()}>
                Șterge
              </button>
            </div>
          </div>
        </div>
      )}
        <div className="admin-users-buttons">
            <div onClick={() => setCurrState('customer')} className={`admin-users-buttons-button ${currState==='customer' ? 'admin-users-buttons-active' : ''}`}>Customers</div>
            <div onClick={() => setCurrState('delivery')} className={`admin-users-buttons-button ${currState==='delivery' ? 'admin-users-buttons-active' : ''}`}>Delivery</div>
            <div onClick={() => setCurrState('admin')} className={`admin-users-buttons-button ${currState==='admin' ? 'admin-users-buttons-active' : ''}`}>Admins</div>
        </div>
        <input 
          className='admin-users-search'
          onChange={(e) => setSearchBar(e.target.value)} 
          value={searchBar} 
          name='searchBar' 
          type='text' 
          placeholder='Cauta utilizatorul (email)'
        />
        <h2 className='admin-users-list-total'>
          {
          searchBar === '' ?
          userList.filter(user => user.role === currState).length
          : userList.filter(user => user.role === currState).filter(user => user.email.includes(searchBar.toLowerCase())).length
          }{` results`}
        </h2>
        <div className="admin-users-list">
          <div className='admin-users-table admin-users-table-title'>
            <p>Email</p>
            <p>Promoveaza</p>
            <p>Sterge</p>
          </div>
          {
            userList.map((item, index) => {
              if(item.role === currState && searchBar === '')
                return(
                  <div className='admin-users-table' key={index}>
                    <p className='admin-users-email'>{item.email}</p>
                    {
                      currState === 'customer' ? <button onClick={() => loading ? null : changeToDelivery(item.email)} className='admin-users-table-promote-button'>Make delivery</button> : null
                    }
                    {
                      currState === 'delivery' ? 
                      <div className='admin-users-delivery-buttons'>
                        <button onClick={() => loading ? null : changeToAdmin(item.email)} className='admin-users-table-promote-button admin-make-admin-button'>Make admin</button>
                        <button onClick={() => loading ? null : changeToCustomer(item.email)} className='admin-users-table-promote-button'>Make customer</button>
                      </div>:null
                    }
                    {
                      currState === 'admin' ? <button onClick={() => loading ? null : changeToDelivery(item.email)} className='admin-users-table-promote-button'>Make delivery</button> : null
                    }
                    <p 
                      onClick={() => loading ? null : popup(item.email)} 
                      className='admin-users-cross'
                    >
                      x
                    </p>

                  </div>
                )
              else if(item.role===currState)
                return (
                  item.email.includes(searchBar.toLowerCase()) ? 
                    <div className='admin-users-table' key={index}>
                      <p>{item.email}</p>
                      {
                        currState === 'customer' ? <button onClick={() => loading ? null : changeToDelivery(item.email)} className='admin-users-table-promote-button'>Make delivery</button> : null
                      }
                      {
                        currState === 'delivery' ? 
                        <div className='admin-users-delivery-buttons'>
                          <button onClick={() => loading ? null : changeToAdmin(item.email)} className='admin-users-table-promote-button admin-make-admin-button'>Make admin</button>
                          <button onClick={() => loading ? null : changeToCustomer(item.email)} className='admin-users-table-promote-button'>Make customer</button>
                        </div>:null
                      }
                      {
                        currState === 'admin' ? <button onClick={() => loading ? null : changeToDelivery(item.email)} className='admin-users-table-promote-button'>Make delivery</button> : null
                      }
                      <p 
                        onClick={() => loading ? null : popup(item.email)} 
                        className='admin-users-cross'
                      >
                        x
                      </p>

                    </div>
                  :null
                )
            })
          }
        </div>
    </div>
  )
}

export default Users
