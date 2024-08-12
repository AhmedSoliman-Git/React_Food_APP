import { useContext } from "react"
import { currency_formatter } from "../util/currencyFormat"
import Button from './UI/Button'
import  CartContext  from "../store/CartContext"
export default function MealItem({meal}){
    const cartctx = useContext(CartContext)

    function handleAddItem(){
        cartctx.addItemToCart(meal)
    }

    return <li className="meal-item">
    <article>
    <img src={`http://localhost:3000/${meal.image}`} />
    <div>
    <h3>{meal.name}</h3>
    <p className="meal-item-price">{currency_formatter.format(meal.price)}</p>
    <p className="meal-item-description">{meal.description}</p>
    <Button textOnly={false} onClick={handleAddItem}>Add To Cart</Button>
    </div>
    </article>
</li>

}