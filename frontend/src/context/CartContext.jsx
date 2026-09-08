import { toast } from "react-toastify";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeCartItem,
} from "../services/cartService";

const CartContext = createContext();

export function CartProvider({ children }) {
  console.log("CartContext loaded");
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

    const addItemLocally = (newItem) => {
      setCartItems((prev) => {
        const existingItem = prev.find(
          (item) =>
            item.menu_item_id === newItem.menu_item_id &&
            item.combo_package_id === newItem.combo_package_id &&
            item.custom_plate_id === newItem.custom_plate_id
        );

        let updatedItems;

        if (existingItem) {
          updatedItems = prev.map((item) =>
            item.id === existingItem.id
              ? {
                  ...item,
                  quantity:
                    item.quantity + newItem.quantity,
                }
              : item
          );
        } else {
          updatedItems = [...prev, newItem];
        }

        const total = updatedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        setCartCount(total);

        return updatedItems;
      });
    };
  }, []);

  const removeItemLocally = (cartItemId) => {
  setCartItems((prev) => {
    const updatedItems = prev.filter(
      (item) => item.id !== cartItemId
    );

    const total = updatedItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    setCartCount(total);

    return updatedItems;
  });
};

const updateItemQuantityLocally = (
  cartItemId,
  quantity
) => {
  console.log("updateItemQuantityLocally called");

  setCartItems((prev) => {
    const updatedItems = prev.map((item) =>
      item.id === cartItemId
        ? {
            ...item,
            quantity,
          }
        : item
    );

    return updatedItems;
  });

  setCartCount((prevCount) => prevCount);
};

const addItemToCart = async ({
  menuItemId = null,
  comboPackageId = null,
  customPlateId = null,
  quantity = 1,
}) => {
  console.log("ADD TO CART CLICKED");
  const previousItems = [...cartItems];
  const previousCount = cartCount;

  try {
    console.log("TOAST FROM CART CONTEXT");

    await addToCart({
      menuItemId,
      comboPackageId,
      customPlateId,
      quantity,
    });

    await refreshCart();

  } catch (error) {
    setCartItems(previousItems);
    setCartCount(previousCount);
    throw error;
  }
};

const increaseQuantity = async (cartItem) => {
  const previousItems = [...cartItems];

  updateItemQuantityLocally(
    cartItem.id,
    cartItem.quantity + 1
  );

  toast.success("Quantity updated");

  try {
    await updateCartItemQuantity(
      cartItem.id,
      cartItem.quantity + 1
    );
  } catch (error) {
    setCartItems(previousItems);

    setCartCount(
      previousItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      )
    );

    toast.error(
      "Failed to update quantity"
    );

    throw error;
  }
};

const decreaseQuantity = async (cartItem) => {
  const previousItems = [...cartItems];

  if (cartItem.quantity === 1) {
    removeItemLocally(cartItem.id);

    toast.info("Item removed");
  } else {
    updateItemQuantityLocally(
      cartItem.id,
      cartItem.quantity - 1
    );

    toast.success("Quantity updated");
  }

  try {
    if (cartItem.quantity === 1) {
      await removeCartItem(cartItem.id);
    } else {
      await updateCartItemQuantity(
        cartItem.id,
        cartItem.quantity - 1
      );
    }
  } catch (error) {
    setCartItems(previousItems);

    setCartCount(
      previousItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      )
    );

    toast.error(
      "Failed to update cart"
    );

    throw error;
  }
};

const removeItem = async (cartItem) => {
  const previousItems = [...cartItems];

  removeItemLocally(cartItem.id);

  toast.info("Item removed from cart");

  try {
    await removeCartItem(cartItem.id);
  } catch (error) {
    setCartItems(previousItems);

    setCartCount(
      previousItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      )
    );

    toast.error(
      "Failed to remove item"
    );

    throw error;
  }
};

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        refreshCart,
        addItemToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}