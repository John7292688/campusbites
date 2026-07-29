import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getCart } from "../services/cartService";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const refreshCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCartItems([]);
      setCartCount(0);
      return;
    }

    try {
      const items = await getCart();

      setCartItems(items);

      const total = items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      setCartCount(total);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}