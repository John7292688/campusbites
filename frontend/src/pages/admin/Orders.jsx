import "../../styles/adminOrders.css";

function Orders() {
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
          <span>0</span>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <span>0</span>
        </div>

        <div className="stat-card">
          <h3>Delivered</h3>
          <span>0</span>
        </div>

        <div className="stat-card">
          <h3>Revenue</h3>
          <span>₦0</span>
        </div>
      </div>

      <div className="orders-table-card">
        <h2>All Orders</h2>

        <p>
          Orders table will appear here.
        </p>
      </div>
    </div>
  );
}

export default Orders;