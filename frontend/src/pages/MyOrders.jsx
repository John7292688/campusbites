import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getMyOrders } from "../services/orderService";
import "../styles/orders.css";
import StatusBadge from "../components/StatusBadge";
import { createSocket } from "../socket";
import OrdersSkeleton from "../components/loaders/OrdersSkeleton";

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

        if (status === "Preparing") {
          toast.info(
            "🍳 Your order is now being prepared"
          );
        }

        if (status === "Ready") {
          toast.success(
            "✅ Your food is ready!"
          );
        }

        if (status === "Delivered") {
          toast.success(
            "🎉 Order delivered successfully!"
          );
        }

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
      socket.off(
        "order_status_updated"
      );
      socket.disconnect();
    };
  }, [socket]);

  if (loading) {
  return <OrdersSkeleton />;
}
  return (
    <section className="orders-page">
      <div className="container">
        <h1>My Orders</h1>

        {orders.length === 0 ? (
          <div
            style={{
              background: "#fff",
              padding: "60px 30px",
              borderRadius: "18px",
              textAlign: "center",
              maxWidth: "700px",
              margin: "0 auto",
              boxShadow:
                "0 8px 25px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                fontSize: "70px",
                marginBottom: "20px",
              }}
            >
              🍽️
            </div>

            <h2
              style={{
                marginBottom: "12px",
              }}
            >
              No Orders Yet
            </h2>

            <p
              style={{
                color: "#666",
                marginBottom: "30px",
              }}
            >
              Start exploring restaurants
              and place your first order.
            </p>

            <Link
              to="/restaurants"
              className="view-menu-btn"
            >
              Browse Restaurants
            </Link>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div
                className="order-card"
                key={order.id}
              >
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
                  <StatusBadge
                    status={order.status}
                  />
                </div>

                <h2
                  style={{
                    color: "#16A34A",
                    margin: "15px 0",
                  }}
                >
                  ₦
                  {Number(
                    order.total_amount
                  ).toLocaleString()}
                </h2>

                <p
                  style={{
                    color: "#666",
                    marginBottom: "20px",
                  }}
                >
                  {new Date(
                    order.created_at
                  ).toLocaleString()}
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