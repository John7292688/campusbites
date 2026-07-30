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
  setCartItems((prev) => {
    const updatedItems = prev.map((item) =>
      item.id === cartItemId
        ? {
            ...item,
            quantity,
          }
        : item
    );

    const total = updatedItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    setCartCount(total);

    return updatedItems;
  });
};

const addItemToCart = async ({
  menuItemId = null,
  comboPackageId = null,
  customPlateId = null,
  quantity = 1,
}) => {
  const previousItems = [...cartItems];
  const previousCount = cartCount;

  try {
    const response = await addToCart({
      menuItemId,
      comboPackageId,
      customPlateId,
      quantity,
    });

    const serverItem = response.cartItem;

    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === serverItem.id
      );

      let updated;

      if (existing) {
        updated = prev.map((item) =>
          item.id === serverItem.id
            ? {
                ...item,
                ...serverItem,
              }
            : item
        );
      } else {
        updated = [...prev, serverItem];
      }

      setCartCount(
        updated.reduce(
          (sum, item) => sum + item.quantity,
          0
        )
      );

      return updated;
    });
  } catch (error) {
    setCartItems(previousItems);
    setCartCount(previousCount);
    throw error;
  }
};

const increaseQuantity = async (cartItem) => {
  const previousItems = [...cartItems];

  // Instant UI update
  updateItemQuantityLocally(
    cartItem.id,
    cartItem.quantity + 1
  );

  try {
    await updateCartItemQuantity(
      cartItem.id,
      cartItem.quantity + 1
    );
  } catch (error) {
    // Roll back if the API fails
    setCartItems(previousItems);

    setCartCount(
      previousItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      )
    );

    throw error;
  }
};

const decreaseQuantity = async (cartItem) => {
  const previousItems = [...cartItems];

  if (cartItem.quantity === 1) {
    removeItemLocally(cartItem.id);
  } else {
    updateItemQuantityLocally(
      cartItem.id,
      cartItem.quantity - 1
    );
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

    throw error;
  }
};

const removeItem = async (cartItem) => {
  const previousItems = [...cartItems];

  // Remove immediately from the UI
  removeItemLocally(cartItem.id);

  try {
    await removeCartItem(cartItem.id);
  } catch (error) {
    // Roll back if the API fails
    setCartItems(previousItems);

    setCartCount(
      previousItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      )
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