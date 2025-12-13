import React, {useState, useRef, useEffect, useContext} from 'react'
import './Add.css'
import {assets} from '../../../assets/assets.js'
import axios from 'axios';
import {toast} from 'react-toastify'
import { Context } from '../../../context/Context.js';
import axiosAuthGuard from '../../../helpers/AxiosAuthGuard.js';

const Add = () => {

  const {url} = useContext(Context);

  const [toggle, setToggle] = useState("food");

  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [categoryImage, setCategoryImage] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: "",
  });
  const fileInputRefCat = useRef(null);

  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = async () => {
    try{
      const response = await axios.get(`${url}/api/food/category/list`);
      if(response.data.success){
        setCategoryList(response.data.data);
      }
      else
        setCategoryList([{name: "Categoriile nu au fost gasite."}])
    }catch(er){}
  };

  useEffect(() => {
    fetchCategoryList();
  }, [toggle]);

  useEffect(() => {
    if (categoryList.length > 0) {
      setData(prev => ({ 
        ...prev, 
        category: categoryList[0].name 
      }));
    }
  }, [categoryList]);
  

  const resetForm = () => {
    setData({
      name: "",
      description: "",
      price: "",
      category: `${categoryList[0].name}`,
    });
    setImage(false);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const onChangeHandler = (event) => {
    const {name, value} = event.target;
    setData(data => ({...data, [name]:value}));
  };

  const onSubmitHandler = async (event) => {
    setLoading(true);
    event.preventDefault();

    if(!data.category || !data.description || !data.name || !data.price || !image){
      toast.error(`Toate campurile trebuie completate.`);
      resetForm();
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    try{
      const response = await axiosAuthGuard.post(`/api/food/add`, formData);
      if(response.data.success){
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
    }catch(er){
      console.log(er);
      toast.error(`A apărut o eroare. Vă rugăm să încercați din nou mai târziu.`);
    }
    setLoading(false);
    resetForm();
  }

  const onSubmitCategoryHandler = async (event) => {
    setLoading(true);
    event.preventDefault();

    if(!categoryData.name || !categoryImage){
      toast.error(`Toate campurile trebuie completate.`);
      setCategoryData({
        name: "",
      });
      setCategoryImage(false);
      if (fileInputRefCat.current) fileInputRefCat.current.value = null;
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryData.name);
    formData.append("image", categoryImage);
    try{
      const response = await axiosAuthGuard.post(`/api/food/category/add`, formData);
      if(response.data.success){ {
        toast.success(response.data.message);
        await fetchCategoryList();
      }
      }else{
        toast.error(response.data.message);
      }
    }catch(er){
      console.log(er);
      toast.error(`A apărut o eroare. Vă rugăm să încercați din nou mai târziu.`);
    }

    setCategoryData({
      name: "",
    });
    setCategoryImage(false);
    if (fileInputRefCat.current) fileInputRefCat.current.value = null;
    setLoading(false);
  }

  return (
    <div className='add'>
      <div className='list-toggle-div'>
        <div
          className={`list-toggle-box ${toggle === 'food' ? 'list-toggle-active' : ''}`}
          onClick={() => toggle === 'food' ? null : setToggle('food')}
        >
          <p>Adauga produs</p>
        </div>

        <div
          className={`list-toggle-box ${toggle === 'category' ? 'list-toggle-active' : ''}`}
          onClick={() => toggle === 'category' ? null : setToggle('category')}
        >
          <p>Adauga categorie</p>
        </div>
      </div>
        {
          toggle === 'food' ? 
          <form className='flex-col' onSubmit={loading ? null : onSubmitHandler}>
            <div className="add-image-upload flex-col">
              <p>Incarca imagine</p>
              <label htmlFor='image'>
                <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt=""/>
              </label>
              <input ref={fileInputRef} onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required/>
            </div>
            <div className="add-product-name flex-col">
              <p>Numele produsului</p>
              <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Numele produsului'/>
            </div>
            <div className="add-product-description flex-col">
              <p>Descrierea produsului</p>
              <textarea onChange={onChangeHandler} value={data.description} name='description' rows='6' placeholder='Descrierea produsului' required></textarea>
            </div>
            <div className="add-category-price">
              <div className="add-category flex-col">
                <p>Categoria produsului</p>
                <select onChange={onChangeHandler} value={data.category} name='category'>
                  {
                    categoryList.map((item, index) => {
                      return(
                        <option value={`${item.name}`} key={index}>{item.name}</option>
                      )
                    })
                  }
                </select>
              </div>
              <div className="add-price flex-col">
                <p>Pretul produsului</p>
                <input onChange={onChangeHandler} value={data.price} type='number' name='price' placeholder='0 lei'/>
              </div>
            </div>
            <button type="submit" className="add-button">
              {loading ? "Se adauga..." : "Adauga"}
            </button>
          </form> 
          : <form className='flex-col' onSubmit={loading ? null : onSubmitCategoryHandler}>
              <div className="add-image-upload flex-col">
                <p>Incarca imagine</p>
                <label htmlFor='image'>
                  <img src={categoryImage ? URL.createObjectURL(categoryImage) : assets.upload_area} alt=""/>
                </label>
                <input ref={fileInputRefCat} onChange={(e) => setCategoryImage(e.target.files[0])} type='file' id='image' hidden required/>
              </div>
              <div className="add-product-name flex-col">
                <p>Numele categoriei</p>
                <input onChange={(e) => setCategoryData({name: e.target.value})} value={categoryData.name} type='text' name='name' placeholder='Numele categoriei'/>
              </div>
              <button type="submit" className="add-button">
                {loading ? "Se adauga..." : "Adauga"}
              </button>
            </form>
        }
      
    </div>
  )
}

export default Add
