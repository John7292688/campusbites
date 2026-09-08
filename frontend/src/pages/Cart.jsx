import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "../styles/cart.css";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCart();

  const [checkingOut, setCheckingOut] =
    useState(false);

  const navigate = useNavigate();

  async function handleCheckout() {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setCheckingOut(true);

    setTimeout(() => {
      navigate("/checkout");
    }, 1500);
  }

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        item.quantity,
    0
  );

  const deliveryFee = 500;

  const total =
    subtotal + deliveryFee;

  return (
    <section className="cart-page">
      <div className="container">
        <h1>My Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>🛒 Your cart is empty</h2>

            <p
              style={{
                marginTop: "10px",
                color: "#666",
              }}
            >
              Add some delicious meals
              before checkout.
            </p>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div
                  className="cart-item"
                  key={item.id}
                >
                  <div>
                    <h3>{item.name}</h3>

                    <p>
                      {item.restaurant_name}
                    </p>

                    <p>
                      {item.description}
                    </p>
                  </div>

                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          decreaseQuantity(
                            item
                          )
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(
                            item
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <h4>
                      ₦
                      {(
                        Number(
                          item.price
                        ) *
                        item.quantity
                      ).toLocaleString()}
                    </h4>

                    <button
                      className="remove-btn"
                      onClick={() => {
                        removeItem(item);

                        toast.success(
                          "Item removed from cart"
                        );
                      }}
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
                <span>
                  Subtotal
                </span>

                <span>
                  ₦
                  {subtotal.toLocaleString()}
                </span>
              </p>

              <p>
                <span>
                  Delivery Fee
                </span>

                <span>
                  ₦
                  {deliveryFee.toLocaleString()}
                </span>
              </p>

              <hr />

              <h3>
                <span>Total</span>

                <span>
                  ₦
                  {total.toLocaleString()}
                </span>
              </h3>

              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={checkingOut}
              >
                {checkingOut
                  ? "LOADING..."
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