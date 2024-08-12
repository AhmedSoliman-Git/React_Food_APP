import { useContext, useState } from "react"
import CartContext from "../store/CartContext"
import { currency_formatter } from "../util/currencyFormat";

export default function ItemInCart({item,increaseItem,decreaseItem}){
    const cartCtx = useContext(CartContext);

    return <li className="cart-item" id={item.id}>
        <p>{item.name} - {item.quantity} x {currency_formatter.format(item.price)} </p>
        <p className="cart-item-actions">
            <button onClick={decreaseItem}>-</button>
            <span>{item.quantity}</span>
            <button onClick={increaseItem}>+</button>
        </p>
    </li>
}