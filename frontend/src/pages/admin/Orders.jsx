import { useEffect, useState } from "react";
import "../../styles/adminOrders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 20;

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/admin`
      );

      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const revenue = orders.reduce(
    (total, order) =>
      total + Number(order.total_amount || 0),
    0
  );

  const indexOfLastOrder =
    currentPage * ordersPerPage;

  const indexOfFirstOrder =
    indexOfLastOrder - ordersPerPage;

  const currentOrders = orders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const totalPages = Math.ceil(
    orders.length / ordersPerPage
  );

  return (
    <div className="admin-orders-page">
      <div className="admin-page-header">
        <h1>Orders Management</h1>

        <p>
          View and manage all orders placed on
          CampusBites.
        </p>
      </div>

      <div className="orders-stats">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <span>{totalOrders}</span>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <span>{pendingOrders}</span>
        </div>

        <div className="stat-card">
          <h3>Delivered</h3>
          <span>{deliveredOrders}</span>
        </div>

        <div className="stat-card">
          <h3>Revenue</h3>
          <span>
            ₦{revenue.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="orders-table-card">
        <h2>All Orders</h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Student</th>
                  <th>Restaurant</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>

                    <td>
                      {order.student_name}
                    </td>

                    <td>
                      {order.restaurant_name}
                    </td>

                    <td>
                      ₦
                      {Number(
                        order.total_amount
                      ).toLocaleString()}
                    </td>

                    <td>{order.status}</td>

                    <td>
                      {new Date(
                        order.created_at
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.max(prev - 1, 1)
                  )
                }
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <span>
                Page {currentPage} of{" "}
                {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      prev + 1,
                      totalPages
                    )
                  )
                }
                disabled={
                  currentPage === totalPages
                }
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Orders;