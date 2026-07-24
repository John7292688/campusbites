import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  updateCartItemQuantity,
  removeCartItem,
} from "../services/cartService";
import { checkout } from "../services/orderService";
import "../styles/cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCart() {
      try {
        const items = await getCart();
        setCartItems(items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  async function handleQuantityChange(cartItemId, newQuantity) {
    if (newQuantity < 1) return;

    try {
      await updateCartItemQuantity(cartItemId, newQuantity);

      setCartItems((items) =>
        items.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleRemove(cartItemId) {
    try {
      await removeCartItem(cartItemId);

      setCartItems((items) =>
        items.filter((item) => item.id !== cartItemId)
      );
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleCheckout() {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setCheckingOut(true);

      await checkout();

      navigate("/order-success");
    } catch (error) {
      alert(error.message);
    } finally {
      setCheckingOut(false);
    }
  }

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const deliveryFee = 500;
  const total = subtotal + deliveryFee;

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <section className="cart-page">
      <div className="container">
        <h1>My Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div>
                    <h3>{item.name}</h3>

                    <p>{item.restaurant_name}</p>

                    <p>{item.description}</p>
                  </div>

                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.quantity - 1
                          )
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <h4>
                      ₦
                      {(
                        Number(item.price) * item.quantity
                      ).toFixed(2)}
                    </h4>

                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-summary">
              <h2>Order Summary</h2>

              <p>
                <span>Subtotal</span>
                <span>₦{subtotal.toFixed(2)}</span>
              </p>

              <p>
                <span>Delivery Fee</span>
                <span>₦{deliveryFee.toFixed(2)}</span>
              </p>

              <hr />

              <h3>
                <span>Total</span>
                <span>₦{total.toFixed(2)}</span>
              </h3>

              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={checkingOut}
              >
                {checkingOut
                  ? "Placing Order..."
                  : "Proceed to Checkout"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;