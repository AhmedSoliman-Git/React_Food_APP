import { useContext } from 'react';
import logo from '../assets/logo.jpg' ;
import Button from './UI/Button';
import  CartContext  from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

export default function Header(){
    const cartctx = useContext(CartContext) ;
    const userProgressCtx = useContext(UserProgressContext);

    const items  = cartctx.items.reduce((totalCartItems,item)=> {
        return totalCartItems + item.quantity ;
    } , 0);


    function handleClick(){
        userProgressCtx.showCart()
    }




    return <header id='main-header'>

        <div id="title">
            <h1>React Food</h1>
            <img src={logo} alt="FOOD"/>
        </div>
        
        <nav>
            <Button textOnly onClick={handleClick}>Cart<span>({items})</span></Button>
        </nav>
    </header>
}