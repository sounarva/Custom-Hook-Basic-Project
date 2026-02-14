import ProductCard from './components/ProductCard'
import Cart from './components/Cart';
import { productsData } from './data/product'
import { AiFillProduct } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { useCartStore } from './store/cartStore';
import { useEffect } from 'react';

const App = () => {
  const setCart = useCartStore((state) => state.setCart)

  useEffect(() => {
    const handleStorage = (evt) => {
      if (evt.key == "cart-storage") {
        const updatedCart = JSON.parse(evt.newValue)
        if (updatedCart?.state?.cart && Array.isArray(updatedCart.state.cart)) {
          setCart(updatedCart.state.cart)
        }
      }
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [setCart])

  return (
    <div className='h-screen w-full bg-zinc-900 text-white px-10 py-15 flex items-start justify-between overflow-hidden'>
      <div className='w-[65%] h-full flex flex-col text-white'>
        <h2 className='boldFont text-4xl border-b border-white/50 pb-5 mb-10 flex items-center gap-5'> <AiFillProduct /> Product Details</h2>
        <div className='products w-full flex-1 overflow-y-auto flex flex-wrap items-start gap-8 pb-5'>
          {productsData.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
      <div className='cartSec w-[30%] text-white'>
        <h2 className='boldFont text-4xl border-b border-white/50 pb-5 mb-10 flex items-center gap-5'><FaCartShopping /> Cart</h2>
        <Cart />
      </div>
    </div>
  )
}

export default App