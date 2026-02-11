# 🛒 React Custom Hook Project

Welcome to the **React Custom Hook Project**! This application demonstrates the power of React's functional components and custom hooks to manage shopping cart state efficiently.

## 🚀 Features

-   **Dynamic Product Listing**: View a list of products with details.
-   **Shopping Cart Management**: Add, remove, and update quantities of items.
-   **Real-time Total Calculation**: Automatically calculates the total cost.
-   **Persistent State**: Cart data is saved to `localStorage`.
-   **Cross-Tab Synchronization**: Cart updates are reflected across multiple open tabs instantly.

---

## 🧠 Code Walkthrough & Learnings

This project was a deep dive into creating **Custom Hooks** to abstract logic away from UI components.

### 1. Custom Hooks (`useCart`)

Instead of cluttering the component with cart logic, I created a custom hook `useCart`. This encapsulates all state management and side effects related to the cart.

**Key takeaway:** Creating custom hooks allows for cleaner code and reusability, separating *logic* from *presentation*.

### 2. Synchronization Across Tabs

One of the coolest features implemented is keeping the cart in sync across different browser tabs.

```javascript
// Sync across tabs
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
```

**How it works:**
-   The `storage` event fires on the `window` object whenever `localStorage` is modified in *another* document (tab/window) from the same origin.
-   We listen for this event. If the modified key is `"cart"`, we parse the new value and update our local React state (`setCart`).
-   This ensures that if you add an item in Tab A, Tab B updates immediately without a refresh!

### 3. Optimizing Performance with `useMemo`

To calculate the total amount, I used the `useMemo` hook.

```javascript
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
```

**What is `useMemo`?**
-   `useMemo` is a built-in React hook that **memoizes** (caches) the result of a calculation.
-   It only re-executes the function when its **dependencies** change.

**Why use it here?**
-   Calculating the total involves iterating over the entire cart array.
-   Without `useMemo`, this calculation would run on **every single render** of the component (e.g., even if a parent component renders or unrelated state changes).
-   By adding `[cart]` as the dependency, React knows to *only* recalculate the total when the `cart` contents actually change. This improves performance, especially as the cart grows larger.

---

## 🛠️ Tech Stack

-   **React** (Vite)
-   **Tailwind CSS**
-   **React Icons**
-   **JavaScript (ES6+)**

## 🏁 Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Run the development server:**
    ```bash
    npm run dev
    ```
