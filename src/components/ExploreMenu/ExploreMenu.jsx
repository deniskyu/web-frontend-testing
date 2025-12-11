import React, {useContext, useState} from 'react'
import './ExploreMenu.css'
import { Context } from '../../context/Context.js'
import MenuItem from './MenuItem/MenuItem.jsx';

const ExploreMenu = () => {

  const [category, setCategory] = useState('');

  const {itemList, categoryList, url} = useContext(Context);
  return (
    <div className='explore-menu' id='meniu'>
      <div className='explore-menu-title-div'>
        <h1 className='explore-menu-title'>Descopera meniul nostru</h1>
        <p className='explore-menu-p'>În restaurantul nostru, fiecare preparat spune o poveste — una creată din ingrediente proaspete, inspirație îndrăzneață și dragoste pentru mâncarea bună. Fie că ni se alăturați pentru un prânz lejer sau pentru o cină de sărbătoare, meniul nostru vă invită să descoperiți o lume a gusturilor în fiecare îmbucătură.</p>
      </div>
      <div className='categories-div'>
        {
          categoryList.map((item, index) => {
            return(
              <div className='category-box' key={index}>
                <img onClick={() => category === item.name ? setCategory('') : setCategory(item.name)} className={`category-image ${category === item.name ? 'category-image-active' : ''}`} src={`${url}/images/${item.image}`}/>
                <h2 className={`category-name ${category === item.name ? 'category-name-active' : ''}`}>{item.name}</h2>
              </div>
            )
          })
        }
      </div>
      <hr />
      <div className='menu-items-div'>
        {
          itemList.map((item, index) => {
            if(category === '' || category.toLowerCase() === item.category.toLowerCase())
              return(
                <MenuItem 
                  key={index}
                  image={item.image} 
                  name={item.name} 
                  description={item.description} 
                  price={item.price}
                  id={item._id}
                />
              )
            return null; 
          })
        }
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
