import React from 'react'
import FormatPrice from '../helpers/FormatPrice';
import CartQuantityToggle from './CartQuantityToggle';
import { FaTrashAlt } from 'react-icons/fa';
import { useCartContext } from '../context/CartContext';

const CartItem = ({id,productId,name,size,price,img,quantity}) => {
    
    const {removeItem,setDecrease,setIncrease,checkStock} = useCartContext();
    let stock = checkStock(id);
    debugger;
   
  return (
    
    <div className='cart-heading grid grid-five-column'>
         {/*image*/}
        <div className='cart-image--name'>
            <div>
                <figure>
                     <img src={img} alt={name}/> 
                </figure>
            </div>
            <div>
                <p>{name}</p>
                <p>Size: {size}</p>
                {stock === 0 ? <p style={{color:"red"}}> Out Of Stock</p> : <></>}
            </div>
        </div>

        {/*price*/}
        <div className='cart-hide'>
            <p><FormatPrice price={price}/></p>
        </div>

         {/*Quantity*/}
         <div>
            <CartQuantityToggle
            quantity={quantity}
            setDecrease={() => setDecrease(id)}
            setIncrease={() =>setIncrease(id)}
            />
         </div>
        
         {/*Total price*/}
         <div className='cart-hide'>
            <p> <FormatPrice price={price*quantity}/> </p>
         </div>

         {/*Remove Item*/}
         <div>
            <FaTrashAlt className='remove_icon' onClick={()=> removeItem(id)}/>
         </div>        
         

    </div>
    
    
  )
}

export default CartItem;
