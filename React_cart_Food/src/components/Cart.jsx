import { useContext, useState } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { currency_formatter } from "../util/currencyFormat";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Button from "./UI/Button.jsx";
import ItemInCart from "./ItemInCart.jsx";
import CheckModal from "./CheckModal.jsx";

export default function Cart(){
    const cartCtx = useContext(CartContext);
    const price = cartCtx.items.reduce((total , item)=> {
        return total + item.price * item.quantity ;
    },0)


    const userProgressCtx = useContext(UserProgressContext) ;

    function handleCloseCart(){
        userProgressCtx.closeCart();
    }

    function handleCheckOut(){
        userProgressCtx.showCheckOut();
    }


    return <Modal className='cart' 
    open={userProgressCtx.progress === 'cart'}
    onClose={userProgressCtx.progress === 'cart'? handleCloseCart : null} //to solve this issue
    // we should make this condition else using null because when this happend with out condition
    // it makes handleCloseCart runs always so it makes that issue so when it's not euqal cart 
    // we tell here to be null
    >

        <h2>Cart Items</h2>
        <ul>{cartCtx.items.map((item)=>{
            return <ItemInCart item={item}
            key={item.id} 
            increaseItem ={()=>cartCtx.addItemToCart(item)}
            decreaseItem ={()=>cartCtx.removeItemfromCart(item.id)}
            />
        })}
        </ul>
        <p className="cart-total">{currency_formatter.format(price)}
        </p>

        <ul className="modal-actions">
            <Button textOnly className='text-button' onClick={handleCloseCart}>Close</Button>
            {cartCtx.items.length > 0 && <Button textOnly={false} onClick={handleCheckOut}>Check out</Button>}
        </ul>
    </Modal>
}