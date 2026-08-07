import { useEffect, useState } from "react";

import StatCard from "../../components/owner/StatCard";
import {
  getDashboardSummary,
  getRecentOrders,
} from "../../services/dashboardService";

import "../../styles/dashboard.css";
import StatusBadge from "../../components/StatusBadge";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    today_orders: 0,
    today_revenue: 0,
    pending_orders: 0,
    preparing_orders: 0,
  });

  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
  fetchSummary();

  const interval = setInterval(fetchSummary, 10000);

  return () => clearInterval(interval);
}, []);

  const fetchSummary = async () => {
  try {
    const [summaryData, ordersData] = await Promise.all([
      getDashboardSummary(),
      getRecentOrders(),
    ]);

    setSummary(summaryData);
    setRecentOrders(ordersData);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
  return <h2>Loading dashboard...</h2>;
}

  return (
    <>
      <div className="dashboard-header">
        <h1>Good Afternoon 👋</h1>

        <p>
          Welcome back! Here's what's happening in your
          restaurant today.
        </p>
      </div>

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
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px 0",
          borderBottom: "1px solid #eee",
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
    </>
  );
};

export default Dashboard;