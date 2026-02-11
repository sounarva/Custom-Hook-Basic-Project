import { useEffect, useMemo, useState } from "react"

export const useCart = () => {
    const [cart, setCart] = useState(() => {
        try {
            const storedCart = localStorage.getItem("cart")
            return storedCart ? JSON.parse(storedCart) : []
        } catch (error) {
            console.error("Failed to fetch cart data from localStorage", error)
            return []
        }
    })

    // Fetch cart each time updation
    useEffect(() => {
        try {
            localStorage.setItem("cart", JSON.stringify(cart))
        } catch (error) {
            console.error("Failed to save cart data to localStorage", error)
        }
    }, [cart])

    // Sync accross tabs
    useEffect(() => {
        const handleStorageChange = (evt) => {
            if (evt.key === "cart") {
                const updatedCart = JSON.parse(evt.newValue || "[]")
                setCart(updatedCart)
            }
        }
        window.addEventListener("storage", handleStorageChange)
        return () => window.removeEventListener("storage", handleStorageChange)
    }, [])

    // Add items to cart
    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id)
            if (existingItem) {
                return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
            }
            return [...prevCart, { ...product, quantity: 1 }]
        })
    }

    // Remove items from cart
    const removeFromCart = (productID) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productID))
    }

    // Update quantity
    const updateQuantity = (productID, newQty) => {
        if (newQty < 1) return
        setCart(prevCart => prevCart.map(item => item.id === productID ? { ...item, quantity: newQty } : item))
    }

    // Total amount
    const totalAmt = useMemo(() => {
        return (
            Number(
                cart.reduce((total, item) => {
                    return total + (item.price * item.quantity)
                }, 0).toFixed(2)
            )
        )
    }, [cart])

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalAmt
    }
}

