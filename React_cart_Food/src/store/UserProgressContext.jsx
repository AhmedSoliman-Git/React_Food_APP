import { createContext, useState } from "react";

const UserProgressContext = createContext({
    progress: '' ,
    showCart:()=>{},
    closeCart : ()=>{},
    showCheckOut : ()=>{},
    closeCheckOut :()=>{}
})


export function UserProgressProvider({children}) {
const [Progress , setProgress] = useState('');

function showCart(){
    setProgress('cart');
}
function closeCart(){
    setProgress('');
}

function showCheckOut(){
    setProgress('checkOut');
}

function closeCheckOut(){
    setProgress('');
}

const userProgressCtx = {
    progress : Progress ,
    showCart,
    closeCart ,
    showCheckOut ,
    closeCheckOut,
}

{
    return <UserProgressContext.Provider value={userProgressCtx}>{children}</UserProgressContext.Provider>
}
}





export default UserProgressContext ;