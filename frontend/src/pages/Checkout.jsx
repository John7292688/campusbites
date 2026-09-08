import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { checkout, getLatestDeliveryInfo } from "../services/orderService";
import { initializePayment } from "../services/paymentService";
import { getDeliveryLocations } from "../services/deliveryLocationService";
import { useCart } from "../context/CartContext";
import "../styles/auth.css";

function Checkout() {
  const student = JSON.parse(
    localStorage.getItem("student")
  );

  const { cartItems } = useCart();  

  const [address, setAddress] =
    useState("");

  const [addressNote, setAddressNote] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [locations, setLocations] =
    useState([]);

  const [selectedLocation, setSelectedLocation] =
    useState("");

  const [deliveryFee, setDeliveryFee] =
    useState(0);  

  const [cartSubtotal, setCartSubtotal] =
    useState(0);  

  useEffect(() => {
    async function loadDeliveryInfo() {
      try {
        const info =
          await getLatestDeliveryInfo();

        if (info) {
          setAddress(
            info.delivery_address || ""
          );

          setAddressNote(
            info.address_note || ""
          );
        }
      } catch (error) {
        console.error(
          "Failed to load delivery info:",
          error
        );
      }
    }

    loadDeliveryInfo();
    async function loadLocations() {
      try {
        const response =
          await getDeliveryLocations();

        setLocations(response.data);
      } catch (error) {
        console.error(
          "Failed to load locations:",
          error
        );
      }
    }

    loadLocations();
  }, []);

  useEffect(() => {
  const subtotal = cartItems.reduce(
    (sum, item) => {
      const price = Number(
        item.price ||
        item.combo_price ||
        item.custom_plate_price ||
        0
      );

      return sum + price * item.quantity;
    },
    0
  );

  setCartSubtotal(subtotal);
}, [cartItems]);

  const handleCheckout = async () => {
    try {
      if (!address.trim()) {
        toast.error(
          "Please enter your delivery address"
        );
        return;
      }

      if (!selectedLocation) {
        toast.error(
          "Please select a delivery location"
        );
        return;
      }

      setLoading(true);

      const checkoutResponse =
        await checkout(
          selectedLocation,
          address,
          addressNote
        );

      const order =
        checkoutResponse.order;

      const payment =
        await initializePayment(
          order.id,
          student.email
        );

      window.location.href =
        payment.authorization_url;
    } catch (error) {
      toast.error(
        error.message ||
          "Checkout failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const grandTotal =
  cartSubtotal + deliveryFee;

return (
  <section className="checkout-page">
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>
          Complete your order and we'll deliver it
          to your location.
        </p>
      </div>

      <div className="checkout-card">
        <div className="form-group">
          <label>Full Name</label>

          <input
            type="text"
            value={student?.full_name || ""}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            value={student?.email || ""}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Delivery Location</label>

          <select
            value={selectedLocation}
            onChange={(e) => {
              const locationId = Number(
                e.target.value
              );

              setSelectedLocation(
                locationId
              );

              const location =
                locations.find(
                  (loc) =>
                    loc.id === locationId
                );

              setDeliveryFee(
                Number(
                  location?.delivery_fee || 0
                )
              );
            }}
          >
            <option value="">
              Select Location
            </option>

            {locations.map((location) => (
              <option
                key={location.id}
                value={location.id}
              >
                {location.location_name}
              </option>
            ))}
          </select>
        </div>

        {deliveryFee > 0 && (
          <div className="delivery-fee-banner">
            🚚 Delivery Fee:
            ₦{deliveryFee.toLocaleString()}
          </div>
        )}

        <div className="order-summary-card">
          <div className="summary-header">
            <h3>Order Summary</h3>
          </div>

          <div className="summary-row">
            <span>Food Total</span>

            <strong>
              ₦{cartSubtotal.toLocaleString()}
            </strong>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>

            <strong>
              ₦{deliveryFee.toLocaleString()}
            </strong>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total-row">
            <span>Grand Total</span>

            <strong>
              ₦{grandTotal.toLocaleString()}
            </strong>
          </div>
        </div>

        <div className="form-group">
          <label>Delivery Address</label>

          <textarea
            placeholder="Enter your delivery address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            required
          />
        </div>

        <div className="form-group">
          <label>
            Additional Direction
            (Optional)
          </label>

          <textarea
            placeholder="e.g. Call me when you arrive"
            value={addressNote}
            onChange={(e) =>
              setAddressNote(
                e.target.value
              )
            }
          />
        </div>

        <button
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : `Pay ₦${grandTotal.toLocaleString()}`}
        </button>
      </div>
    </div>
  </section>
);
}

export default Checkout;