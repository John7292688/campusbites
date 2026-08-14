import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../services/orderService";
import "../styles/orders.css";
import StatusBadge from "../components/StatusBadge";
import { createSocket } from "../socket";

function MyOrders() {
  const socket = useMemo(
    () =>
      createSocket(
        localStorage.getItem("token")
      ),
    []
  );
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();

  socket.on("connect", () => {
    console.log(
      "🟢 Student socket connected:",
      socket.id
    );
  });

  socket.on(
    "order_status_updated",
    ({ orderId, status }) => {
      console.log(
        "📦 Order updated:",
        orderId,
        status
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? { ...order, status }
            : order
        )
      );
    }
  );

  return () => {
    socket.off("connect");
    socket.off("order_status_updated");
    socket.disconnect();
  };
}, []);

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Loading orders...
      </h2>
    );
  }

  return (
    <section className="orders-page">
      <div className="container">
        <h1>My Orders</h1>

        {orders.length === 0 ? (
          <p>You haven't placed any orders yet.</p>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <h3
                  style={{
                    marginBottom: "8px",
                  }}
                >
                  🍽 {order.restaurant_name}
                </h3>

                <p
                  style={{
                    color: "#666",
                    marginBottom: "16px",
                  }}
                >
                  Order #{order.id}
                </p>

                <div
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  <StatusBadge status={order.status} />
                </div>

                <h2
                  style={{
                    color: "#16A34A",
                    margin: "15px 0",
                  }}
                >
                  ₦{Number(order.total_amount).toLocaleString()}
                </h2>

                <p
                  style={{
                    color: "#666",
                    marginBottom: "20px",
                  }}
                >
                  {new Date(order.created_at).toLocaleString()}
                </p>

                <Link
                  to={`/orders/${order.id}`}
                  className="view-menu-btn"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default MyOrders;