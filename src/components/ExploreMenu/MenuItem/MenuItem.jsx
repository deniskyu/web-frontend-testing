import React, { useContext, useState } from 'react'
import './MenuItem.css'
import { Context } from '../../../context/Context'
import {assets} from '../../../assets/assets';

const MenuItem = ({image, name, description, price, id}) => {
  const {url, cart, addToCart, removeFromCart} = useContext(Context);

  return (
    <div className='menu-item-div'>
      <div className='menu-item-image-div'>
        <img src={`${url}/images/${image}`} className='menu-item-image'/>
        <div className='add-item-div'>
            {
                cart[id] ? 
                <div className='add-item-count-div'>
                    <img onClick={() => addToCart(id)} src={assets.add_icon_green}/>
                    <p className='add-item-count'>{cart[id]}</p>
                    <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red}/>
                </div> 
                : <img onClick={() => addToCart(id)} src={assets.add_icon_white} className='add-item-white-img'/>
            }
        </div>
      </div>
      <div className='menu-item-text-div'>
        <p className="menu-item-name">{name}</p>
        <p className="menu-item-description">{description}</p>
        <p className="menu-item-price">{price} lei</p>
      </div>
    </div>
  )
}

export default MenuItem
