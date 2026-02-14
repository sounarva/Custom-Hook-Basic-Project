import { FaArrowAltCircleRight } from "react-icons/fa";
import CartItem from './CartItem';
import { IoBagCheckOutline } from "react-icons/io5";
import { useCartStore } from "../store/cartStore";
import { useMemo } from "react";

const Cart = () => {
    const cartState = useCartStore((state) => state.cart)
    const cart = Array.isArray(cartState) ? cartState : []
    const totalAmt = useMemo(() => {
        return Number(
            cart.reduce((total, item) => {
                const amount = item.price * item.quantity
                return total + amount
            }, 0)
        ).toFixed(2)
    }, [cart])

    return (
        <div className='w-full h-102 bg-zinc-800 border-l-5 border-blue-500 rounded-2xl p-5 relative'>
            <h2 className='regularFont text-2xl border-b border-white/50 pb-2 mb-3 flex items-center gap-3'>Product Summary <FaArrowAltCircleRight className='text-2xl' /></h2>
            {cart.length === 0 ? (
                <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 regularFont text-xl text-white/50 italic text-center'>Cart is empty</p>
            ) : (
                <div className='cartItems w-full h-[65%] overflow-y-auto px-3 py-2 flex flex-col gap-3'>
                    {cart.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                        />
                    ))}
                </div>
            )}
            {cart.length === 0 ? '' : (
                <div className='w-full h-[20%] px-3 flex items-start justify-between mt-5'>
                    <h3 className='boldFont text-md uppercase border border-white/50 px-3 py-2 rounded-2xl'>Total : <span className='text-green-500'>&nbsp; $ {totalAmt}</span></h3>
                    <button className='bg-green-500 boldFont text-md px-5 py-3 rounded-2xl flex items-center gap-2 cursor-pointer active:scale-95 transition-all duration-200 uppercase'>
                        <IoBagCheckOutline className='text-2xl' /> Checkout
                    </button>
                </div>
            )}
        </div>
    )
}

export default Cart