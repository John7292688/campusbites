import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { checkout } from "../services/orderService";
import "../styles/cart.css";

function Cart() {
  const {
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} = useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  const navigate = useNavigate();


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
                        onClick={() => decreaseQuantity(item)}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQuantity(item)}
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
                      onClick={() => removeItem(item)}
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