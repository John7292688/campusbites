import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../services/orderService";
import Navbar from "../components/Navbar";
import "../styles/orders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error(error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "40px" }}>
          Loading orders...
        </h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="orders-page">
        <div className="container">
          <h1>My Orders</h1>

          {orders.length === 0 ? (
            <p>You haven't placed any orders yet.</p>
          ) : (
            <div className="orders-grid">
              {orders.map((order) => (
                <div className="order-card" key={order.id}>
                  <h3>Order #{order.id}</h3>

                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>

                  <p>
                    <strong>Total:</strong> ₦
                    {Number(order.total_amount).toFixed(2)}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.created_at).toLocaleDateString()}
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
    </>
  );
}

export default MyOrders;