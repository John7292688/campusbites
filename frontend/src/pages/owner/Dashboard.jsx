import { useEffect, useState } from "react";
import OrderDetailsDialog from "../../components/owner/OrderDetailsDialog";
import StatCard from "../../components/owner/StatCard";
import {
  getDashboardSummary,
  getRecentOrders,
  getTopSellingMenuItem,
} from "../../services/dashboardService";
import { toast } from "react-toastify";

import "../../styles/dashboard.css";
import StatusBadge from "../../components/StatusBadge";

const Dashboard = () => {
  const [summary, setSummary] = useState({
  today_orders: 0,
  today_revenue: 0,
  pending_orders: 0,
  preparing_orders: 0,
  delivered_orders: 0,
});

  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topSellingItem, setTopSellingItem] =
  useState(null);
  const [previousOrderCount, setPreviousOrderCount] =
  useState(0);
  const [currentOrderCount, setCurrentOrderCount] =
  useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
  fetchSummary();

  const interval = setInterval(fetchSummary, 5000);

  return () => clearInterval(interval);
}, []);

useEffect(() => {
  if (
    previousOrderCount > 0 &&
    currentOrderCount > previousOrderCount
  ) {
    toast.success("🔔 New order received!");
  }

  setPreviousOrderCount(currentOrderCount);
}, [currentOrderCount]);

  const fetchSummary = async () => {
    try {
      const [
        summaryData,
        ordersData,
        topItemData,
      ] = await Promise.all([
        getDashboardSummary(),
        getRecentOrders(),
        getTopSellingMenuItem(),
      ]);
    setCurrentOrderCount(
      Number(summaryData.today_orders)
    );

    setSummary(summaryData);
    console.log("RECENT ORDERS:", ordersData);
    setRecentOrders(ordersData);
    setTopSellingItem(topItemData);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
  return <h2>Loading dashboard...</h2>;
}

const handleViewOrder = (order) => {
  console.log("SELECTED ORDER:", order);

  setSelectedOrder(order);
  setDialogOpen(true);
};

const currentHour = new Date().getHours();

let greeting = "Good Evening";

if (currentHour < 12) {
  greeting = "Good Morning";
} else if (currentHour < 18) {
  greeting = "Good Afternoon";
}

  return (
    <>
      <div className="dashboard-header">
        <div>
          <h1>{greeting} 👋</h1>

          <p>
            Welcome back! Here's what's happening in
            your restaurant today.
          </p>
        </div>
      </div>

      {summary.pending_orders > 0 ? (
  <div
    style={{
      background: "#FEF2F2",
      border: "1px solid #FECACA",
      color: "#B91C1C",
      padding: "16px",
      borderRadius: "12px",
      marginBottom: "20px",
      fontWeight: "600",
    }}
  >
    🔴 {summary.pending_orders} Pending Order
    {summary.pending_orders > 1 ? "s" : ""} require
    attention
  </div>
) : (
  <div
    style={{
      background: "#ECFDF5",
      border: "1px solid #A7F3D0",
      color: "#065F46",
      padding: "16px",
      borderRadius: "12px",
      marginBottom: "20px",
      fontWeight: "600",
    }}
  >
    🟢 No pending orders
  </div>
)}

      <div className="stats-grid">
      <StatCard
        title="Today's Orders"
        value={summary.today_orders}
        color="#3B82F6"
      />

      <StatCard
        title="Today's Revenue"
        value={`₦${Number(summary.today_revenue).toLocaleString()}`}
        color="#10B981"
      />

      <StatCard
        title="Pending Orders"
        value={summary.pending_orders}
        color="#F59E0B"
      />

      <StatCard
        title="Preparing"
        value={summary.preparing_orders}
        color="#EF4444"
      />

      <StatCard
        title="Delivered"
        value={summary.delivered_orders}
        color="#10B981"
      />

      <StatCard
        title="Top Selling Combo"
        value={
          topSellingItem
            ? `${topSellingItem.name} (${topSellingItem.total_sold})`
            : "No Sales Yet"
        }
        color="#8B5CF6"
      />
    </div>

    <div
  style={{
    marginTop: "40px",
    background: "#fff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  }}
>
  <h2 style={{ marginBottom: "20px" }}>
    Recent Orders
  </h2>

  {recentOrders.length === 0 ? (
    <p>No recent orders.</p>
  ) : (
    recentOrders.map((order) => (
      <div
        key={order.id}
        onClick={() => handleViewOrder(order)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 0",
          borderBottom: "1px solid #eee",
          cursor: "pointer",
        }}
      >
        <div>
          <strong>{order.full_name}</strong>

          <div
            style={{
              color: "#666",
              fontSize: "14px",
            }}
          >
            {order.phone}
          </div>
        </div>

        <div
          style={{
            textAlign: "right",
          }}
        >
          <div
            style={{
              fontWeight: "600",
            }}
          >
            ₦
            {Number(
              order.total_amount
            ).toLocaleString()}
          </div>

          <div
            style={{
              marginTop: "6px",
            }}
          >
            <StatusBadge
              status={order.status}
            />
          </div>
        </div>
      </div>
    ))
  )}
</div>

<OrderDetailsDialog
  open={dialogOpen}
  onClose={() => setDialogOpen(false)}
  order={selectedOrder}
  onStatusUpdated={fetchSummary}
/>
    </>
  );
};

export default Dashboard;