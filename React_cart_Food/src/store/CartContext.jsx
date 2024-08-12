import { createContext, useReducer } from "react";

    const CartContext = createContext({
    items:[],
    addItemToCart : (item)=>{},
    removeItemfromCart : (id)=>{},
    clearCart : ()=>{}
})

function cartReducer(state,action) {
    if(action.type === 'ADD_ITEM') {
        const existingItem = state.items.findIndex((item)=> item.id === action.item.id)
        let updatedItems = [...state.items];
        if(existingItem > -1){
            let foundItem = state.items[existingItem] ;
            const updatedItem = {
                ...foundItem ,
                quantity : foundItem.quantity + 1
            }
            updatedItems[existingItem] = updatedItem ;
        } else {
            updatedItems.push({...action.item , quantity : 1})

        }
        return {...state , items: updatedItems } ;
        //here we make that beacuse after we add a new item we want to see state after that and
        //we used items:updatedItems .. because we want to change a part of state so it's useful
    }


    if(action.type === 'REMOVE_ITEM'){
        let existingItemIndex = state.items.findIndex((item)=> item.id === action.id);
        let updatedItems = [...state.items];
        const existingItem =state.items[existingItemIndex]
        if(existingItem.quantity === 1) {
            updatedItems.splice(existingItem ,1);
        }else {
            const updatedItem = {
                ...existingItem ,
                quantity : existingItem.quantity-1
            }
            updatedItems[existingItemIndex] = updatedItem ;
        }
        return {...state , items:updatedItems}
    }

    if(action.type === 'CLEAR') {
        return {...state , items:[]}
    }
    
    return state;
}



export function ContextProvider({children}){

    const [cart, dispatchAction]= useReducer(cartReducer,{ items:[] }) ;


    function addItemToCart(item){
        dispatchAction({type :'ADD_ITEM' ,item})
    }

    function removeItemfromCart(id) {
        dispatchAction({type :'REMOVE_ITEM', id})
    }

    function clearCart(){
        dispatchAction({ type:'CLEAR' })
    }


    const cart_Context = {
        items:cart.items,
        addItemToCart,
        removeItemfromCart,
        clearCart
    }
    // console.log(cart_Context)
    return <CartContext.Provider value={cart_Context}>{children}</CartContext.Provider>
}

export default CartContext ;