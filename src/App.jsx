import ProductCard from './components/ProductCard'
import Cart from './components/Cart';
import { productsData } from './data/product'
import { AiFillProduct } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from './hooks/useCart';

const App = () => {
  const {cart , addToCart , removeFromCart , updateQuantity , totalAmt} = useCart()
  return (
    <div className='h-screen w-full bg-zinc-900 text-white px-10 py-15 flex items-start justify-between overflow-hidden'>
      <div className='w-[65%] h-full flex flex-col text-white'>
        <h2 className='boldFont text-4xl border-b border-white/50 pb-5 mb-10 flex items-center gap-5'> <AiFillProduct /> Product Details</h2>
        <div className='products w-full flex-1 overflow-y-auto flex flex-wrap items-start gap-8 pb-5'>
          {productsData.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>
      <div className='cartSec w-[30%] text-white'>
        <h2 className='boldFont text-4xl border-b border-white/50 pb-5 mb-10 flex items-center gap-5'><FaCartShopping /> Cart</h2>
        <Cart 
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        totalAmt={totalAmt}/>
      </div>
    </div>
  )
}

export default App