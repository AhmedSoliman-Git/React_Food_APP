import Input from './UI/Input.jsx'
import Modal from './UI/Modal.jsx'
import { currency_formatter } from "../util/currencyFormat";
import { useContext } from "react"
import CartContext from "../store/CartContext";
import Button from "./UI/Button";
import Error from './Error';
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";

const requestConfig = {
    method : 'POST',
    headers : {
        'Content-Type' : 'application/json'
    } 
}

export default function CheckModal({}){
    const cartctx = useContext(CartContext)
    const userCtx = useContext(UserProgressContext)
    const items  = cartctx.items.reduce((totalCartItems,item)=> {
        return totalCartItems + item.quantity * item.price ;
    } , 0);

    function handleFinish(){
        userCtx.closeCheckOut()
        cartctx.clearCart();
        setDatafunc();
    }

    function handleClose() {
        userCtx.closeCheckOut()

    }

    const {isLoading ,
        error ,
        data:httpData,
        sendRequest,
        setDatafunc} = useHttp("http://localhost:3000/orders",requestConfig);

    function handleSubmit(event){
        event.preventDefault();
        const fd = new FormData(event.target) ; //using of FormData you can catch data using [name or id]
        const datafd = Object.fromEntries(fd.entries());
        sendRequest(
            JSON.stringify({
            order:{
                items:cartctx.items ,
                customer : datafd ,
            }
        }))
        // fetch('http://localhost:3000/orders',{
        //     method:'POST',
        //     headers:{
        //         'Content-Type' : 'application/json'
        //     },
        //     body:JSON.stringify({
        //         order:{
        //             items:cartctx.items ,
        //             customer : data ,
        //         }
        //     })
        // })
    }


    let actions = 
        <>
            <Button textOnly type='button'onClick={handleFinish}>Close</Button>
            <Button>Submit Order</Button>
        </>

    if(isLoading) {
        actions = 'Sending Data ...'
    }

    if(httpData && !error){
        return <Modal open={userCtx.progress === 'checkOut'}>
            <h2>It was a good deal have a good day</h2>
            <p>if there is any problem try to call us on +012</p>
            <Button onClick={handleFinish}>Close</Button>
        </Modal>
    }

    return <Modal open={userCtx.progress === 'checkOut'} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
            <h2>Check Out</h2>
            <p>Total amount : {currency_formatter.format(items)}</p>

            <Input type ='text' id='name'  labelName='Full Name'/>  
            <Input type ='email' id='email' labelName='E-mail Address'/>
            <Input type ='text' id='street' name ='street' labelName='Street'/>
            <div className="control-row">
            <Input type ='text' id='postal-code' labelName='Postal-code'/>
            <Input type ='text' id='city' labelName='City'/>
            </div>

            {error && <Error title="An Error Occured" message={error.message}/>}
            <p className="modal-actions">
                {actions}
            </p>




        </form>
    </Modal>
}