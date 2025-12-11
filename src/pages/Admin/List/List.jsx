import React, { useContext, useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Context } from '../../../context/Context';
import axiosAuthGuard from '../../../helpers/AxiosAuthGuard';

const List = () => {

  const {url} = useContext(Context);

  const [list, setList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState('food');
  const [searchText, setSearchText] = useState('');
  const [youSure, setYouSure] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState("");


  useEffect(() => {
    fetchList();
  }, [searchText]);

  const popup = (id, type) => {
    setItemToDelete(id);
    setDeleteType(type);
    setYouSure(true);
  };
  

  const fetchList = async () => {
    try{
      const response = await axios.get(`${url}/api/food/list`);
      if(response.data.success)
        setList(response.data.data);
      else
        toast.error(response.data.messag);
    }catch(er){
      console.log(er);
      toast.error(`A apărut o eroare. Vă rugăm să încercați din nou mai târziu.`);
    }
  };

  const fetchCategoryList = async () => {
    try{
      const response = await axios.get(`${url}/api/food/category/list`);
      if(response.data.success)
        setCategoryList(response.data.data);
      else
        toast.error(response.data.message);
    }catch(er){
      console.log(er);
      toast.error(`A apărut o eroare. Vă rugăm să încercați din nou mai târziu.`);
    }
  };

  const removeFood = async (foodId) => {
    setLoading(true);
    try{
      const response = await axiosAuthGuard.post(`/api/food/remove`, {id: foodId});
      if(response.data.success)
        toast.success(response.data.message);
      else
        toast.error(response.data.message);
      await fetchList();
    }catch(er){
      console.log(er);
      toast.error(`A apărut o eroare. Vă rugăm să încercați din nou mai târziu.`);
    };
    setLoading(false);
  };

  const removeCategory = async (categoryId) => {
    setLoading(true);
    try{
      const response = await axiosAuthGuard.post(`/api/food/category/remove`, {id: categoryId});
      if(response.data.success)
        toast.success(response.data.message);
      else
        toast.error(response.data.message);
      await fetchCategoryList();
    }catch(er){
      console.log(er);
      toast.error(`A apărut o eroare. Vă rugăm să încercați din nou mai târziu.`);
    };
    setLoading(false);
  };

    useEffect(() => {
      toggle === 'food' ? fetchList() : fetchCategoryList();
    }, [toggle]);

    const confirmDelete = async () => {
      setYouSure(false);
      setLoading(true);
    
      if (deleteType === "food") await removeFood(itemToDelete);
      if (deleteType === "category") await removeCategory(itemToDelete);
    
      setLoading(false);
    };

  return (
    <div className="list add flex-col">
      {youSure && (
      <div className="orders-popup-overlay">
        <div className="orders-popup">
          <h3>Esti sigur?</h3>
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
      <div className='list-toggle-div'>
        <div
          className={`list-toggle-box ${toggle === 'food' ? 'list-toggle-active' : ''}`}
          onClick={() => toggle === 'food' ? null : setToggle('food')}
        >
          <p>Lista produselor</p>
        </div>

        <div
          className={`list-toggle-box ${toggle === 'category' ? 'list-toggle-active' : ''}`}
          onClick={() => toggle === 'category' ? null : setToggle('category')}
        >
          <p>Lista categoriilor</p>
        </div>
      </div>
      {toggle==='food' ? <div className='list-items-search-div'>
          <input onChange={(e) => setSearchText(e.target.value)} className='list-items-search-input'type='text' placeholder='Cauta un produs'/>
        </div> : null}
      {
        toggle==='food' ? 
          <div className="list-table">
            <div className="list-table-format title">
              <b>Imagine</b>
              <b>Nume</b>
              <b>Categorie</b>
              <b>Pret</b>
              <b>Sterge</b>
            </div>
            {
              list.map((item, index) => {
                return(
                  searchText === '' ? <div key={index} className='list-table-format'>
                    <img src={`${url}/images/${item.image}`} alt=""/>
                    <p>{item.name}</p>
                    <p className='list-table-category'>{item.category}</p>
                    <p>{item.price}lei</p>
                    <p 
                      onClick={() => loading ? null : popup(item._id, "food")}
                      className="list-table-cross"
                    >
                      x
                    </p>
                  </div> : item.name.toLowerCase().includes(searchText.toLowerCase()) ? <div key={index} className='list-table-format'>
                    <img src={`${url}/images/${item.image}`} alt=""/>
                    <p>{item.name}</p>
                    <p className='list-table-category'>{item.category}</p>
                    <p>{item.price}lei</p>
                    <p 
                      onClick={() => loading ? null : popup(item._id, "food")}
                      className="list-table-cross"
                    >
                      x
                    </p>

                  </div> : null
                )
              })
            }
          </div>
          : <div className='list-table'>
            <div className='list-table-categories-format title'>
              <b>Imagine</b>
              <b>Nume</b>
              <b>Sterge</b>
            </div>
            {
              categoryList.map((item, index) => {
                return (
                  <div className='list-table-categories-format' key={index}>
                      <img src={`${url}/images/${item.image}`} alt=""/>
                      <p>{item.name}</p>
                      <p 
                        onClick={() => loading ? null : popup(item._id, "category")}
                        className="list-table-cross"
                      >
                        x
                      </p>
                  </div>
                )
              })
            }
          </div>
      }
    </div>
  )
}


export default List
