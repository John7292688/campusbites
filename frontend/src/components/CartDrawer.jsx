import { useNavigate } from "react-router-dom";
import "./../styles/cart-drawer.css";
import { useCart } from "../context/CartContext";
import {
  updateCartItemQuantity,
  removeCartItem,
} from "../services/cartService";
import { checkout } from "../services/orderService";

function CartDrawer({
  isOpen,
  closeCart,
}) {
  const navigate = useNavigate();

  const {
    cartItems,
    cartCount,
    refreshCart,
  } = useCart();

  const total = cartItems.reduce((sum, item) => {
    const price = Number(
      item.price ||
        item.combo_price ||
        item.custom_plate_price ||
        0
    );

    return sum + price * item.quantity;
  }, 0);

  const handleQuantityChange = async (
    item,
    change
  ) => {
    const newQuantity = item.quantity + change;

    try {
      if (newQuantity <= 0) {
        await removeCartItem(item.id);
      } else {
        await updateCartItemQuantity(
          item.id,
          newQuantity
        );
      }

      refreshCart();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your tray is empty.");
      return;
    }

    try {
      await checkout();

      closeCart();

      refreshCart();

      navigate("/order-success");
    } catch (error) {
      console.error(error);

      alert(
        error.message || "Checkout failed."
      );
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${
          isOpen ? "show" : ""
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`cart-drawer ${
          isOpen ? "open" : ""
        }`}
      >
        <div className="cart-header">
          <h2>Your Tray ({cartCount})</h2>

          <button
            className="close-btn"
            onClick={closeCart}
          >
            ✕
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <h3>Your tray is empty</h3>

              <p>
                Add some delicious meals to get started.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="cart-item"
              >
                <div className="cart-item-left">
                  <h4>
                    {item.name ||
                      item.combo_name ||
                      item.custom_plate_name}
                  </h4>

                  <p className="cart-item-price">
                    ₦
                    {Number(
                      item.price ||
                        item.combo_price ||
                        item.custom_plate_price ||
                        0
                    ).toLocaleString()}
                  </p>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      handleQuantityChange(
                        item,
                        -item.quantity
                      )
                    }
                  >
                    Remove
                  </button>
                </div>

                <div className="cart-item-right">
                  <button
                    onClick={() =>
                      handleQuantityChange(item, -1)
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      handleQuantityChange(item, 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="summary-row">
            <span>Subtotal</span>

            <strong>
              ₦{total.toLocaleString()}
            </strong>
          </div>

          <div className="summary-row">
            <span>Delivery</span>

            <strong>₦0</strong>
          </div>

          <hr />

          <div className="cart-total">
            <span>Total</span>

            <strong>
              ₦{total.toLocaleString()}
            </strong>
          </div>

          <button
            className="checkout-btn"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}

export default CartDrawer;