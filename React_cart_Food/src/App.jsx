import Cart from "./components/Cart";
import CheckModal from "./components/CheckModal";
import Header from "./components/Header";
import Meals from "./components/meals";
import {ContextProvider} from './store/CartContext'
import {UserProgressProvider} from "./store/UserProgressContext";
function App() {
  return (
    <UserProgressProvider>
      <ContextProvider>
        <Header />
        <Meals />
        <Cart/>
        <CheckModal />
      </ContextProvider>
    </UserProgressProvider> 
  );
}

export default App;
