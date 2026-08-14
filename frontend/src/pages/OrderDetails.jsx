import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderItems } from "../services/orderService";
import OrderTracker from "../components/OrderTracker";
import "../styles/orders.css";

function OrderDetails() {
  const { orderId } = useParams();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await getOrderItems(orderId);
        setItems(data);
      } catch (error) {
        console.error(error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, [orderId]);

  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Loading order...
      </h2>
    );
  }

  return (
    <section className="orders-page">
      <div className="container">
        <h1>Order #{orderId}</h1>
        <OrderTracker
          status={items[0]?.status || "Pending"}
        />

        {items.length > 0 && (
          <h3 style={{ marginBottom: "25px" }}>
            Restaurant: {items[0].restaurant_name}
          </h3>
        )}

        <div className="orders-grid">
          {items.map((item) => (
            <div className="order-card" key={item.id}>
              {item.menu_item_name && (
                <h3>{item.menu_item_name}</h3>
              )}

              {item.combo_package_name && (
                <h3>
                  Combo Package: {item.combo_package_name}
                </h3>
              )}

              {item.custom_plate_id && (
                <>
                  <h3>Custom Plate</h3>

                  <div
                    style={{
                      marginTop: "10px",
                      marginBottom: "15px",
                      paddingLeft: "10px",
                    }}
                  >
                    {item.custom_plate_items?.map(
                      (plateItem, index) => (
                        <p key={index}>
                          • {plateItem.name} ×{" "}
                          {plateItem.quantity}
                        </p>
                      )
                    )}
                  </div>
                </>
              )}

              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>

              <p>
                <strong>Price:</strong> ₦
                {Number(item.price).toLocaleString()}
              </p>

              <p>
                <strong>Total:</strong> ₦
                {(Number(item.price) * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "40px",
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2>
            Grand Total: ₦{total.toLocaleString()}
          </h2>

          <Link
            to="/my-orders"
            className="view-menu-btn"
            style={{
              marginTop: "20px",
              display: "inline-block",
            }}
          >
            Back to My Orders
          </Link>
        </div>
      </div>
    </section>
  );
}

export default OrderDetails;