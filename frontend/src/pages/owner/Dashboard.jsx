import StatCard from "../../components/owner/StatCard";
import "../../styles/dashboard.css";

const Dashboard = () => {
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
          title="Orders"
          value="0"
          color="#3B82F6"
        />

        <StatCard
          title="Revenue"
          value="₦0"
          color="#10B981"
        />

        <StatCard
          title="Packages"
          value="0"
          color="#F59E0B"
        />

        <StatCard
          title="Customers"
          value="0"
          color="#EF4444"
        />
      </div>
    </>
  );
};

export default Dashboard;