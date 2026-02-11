import React from 'react'
import { MdOutlineAddShoppingCart } from "react-icons/md";

const ProductCard = ({item , addToCart}) => {
    return (
        <div id={item.id} className='w-72 p-5 border border-white/30 rounded-2xl text-white flex flex-col items-center gap-5'>
            <h2 className='boldFont text-2xl text-center'>{item.name}</h2>
            <div className='w-[100px] h-[100px] rounded-full overflow-hidden'>
                <img className='w-full h-full object-cover' src={item.image} alt="" />
            </div>
            <h3 className='boldFont text-2xl flex items-center gap-3'><span className='px-3 py-2 border border-blue-500 rounded-full text-sm uppercase'>Price:</span>$ {item.price}</h3>
            <button
            onClick={()=> addToCart(item)}
             className='bg-blue-500 boldFont text-md px-5 py-3 rounded-2xl flex items-center gap-2 cursor-pointer active:scale-95 transition-all duration-200 uppercase'>
                <MdOutlineAddShoppingCart className='text-2xl'/> Add to Cart
            </button>
        </div>
    )
}

export default ProductCard