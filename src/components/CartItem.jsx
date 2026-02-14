import React from 'react'
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import { MdDelete } from 'react-icons/md';
import { useCartStore } from "../store/cartStore";

const CartItem = ({ item }) => {
    const removeFromCart = useCartStore((state) => state.removeFromCart)
    const updateQuantity = useCartStore((state) => state.updateQuantity)
    return (
        <>
            <div className='px-4 flex flex-col items-start gap-2 border-l-4 border-blue-500 bg-zinc-900 rounded-xl p-3'>
                <div className='w-full flex items-center justify-between'>
                    <h3 className='regularFont text-xl'>{item.name}</h3>
                    <h3 className='regularFont text-xl'>$ {item.price}</h3>
                </div>
                <div className='flex items-center gap-4 mt-2 relative w-full'>
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className='bg-zinc-600 text-white px-2 py-2 rounded-full cursor-pointer active:scale-95 transition-all duration-200'><IoMdRemove className='text-xl' /></button>
                    <span className='regularFont text-xl'>{item.quantity}</span>
                    <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className='bg-zinc-600 text-white px-2 py-2 rounded-full cursor-pointer active:scale-95 transition-all duration-200'><IoMdAdd className='text-xl' /></button>
                    <button
                        onClick={() => removeFromCart(item.id)}
                        className='absolute right-0 top-0 bg-red-500 text-white px-2 py-2 rounded-full cursor-pointer active:scale-95 transition-all duration-200'><MdDelete className='text-xl' /></button>
                </div>
            </div>
        </>
    )
}

export default CartItem