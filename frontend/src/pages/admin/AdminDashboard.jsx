import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/adminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRestaurants: 0,
    approvedRestaurants: 0,
    pendingRestaurants: 0,
  });

  const [recentRestaurants, setRecentRestaurants] =
     useState([]);

  const [restaurants, setRestaurants] = useState([]);



  const fetchStats = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin-dashboard/stats`
      );

      setStats(response.data.stats);
      console.log(response.data);
      setRecentRestaurants(
        response.data.stats
          .recentRestaurants || []
      );
    } catch (error) {
      console.error(error);
    }
  };

const fetchRestaurants = async () => {
  try {
    const token = localStorage.getItem("adminToken");

    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/restaurants`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setRestaurants(response.data.restaurants);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
    fetchStats();
    fetchRestaurants();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <div>
          <h1
            style={{
              marginBottom: "10px",
              fontSize: "48px",
              fontWeight: "700",
            }}
          >
            Dashboard
          </h1>

          <p
            style={{
              color: "#64748B",
              fontSize: "18px",
            }}
          >
            Welcome back. Here's what's happening on CampusBites.
          </p>
        </div>

        <div
          style={{
            textAlign: "right",
          }}
          className="dashboard-date"
        >
          <p
            style={{
              color: "#64748B",
              marginBottom: "5px",
            }}
          >
            Today
          </p>

          <h3
            style={{
              margin: 0,
              fontSize: "14px",
              color: "#64748B",
              fontWeight: "500",
            }}
          >
            {new Date().toLocaleDateString()}
          </h3>
        </div>
      </div>

      <div className="admin-welcome-card">
        <div>
          <h2
            style={{
              margin: 0,
              marginBottom: "8px",
            }}
          >
            Welcome back, Admin 👋
          </h2>

          <p
            style={{
              margin: 0,
              opacity: 0.9,
            }}
          >
            Manage restaurants, orders and platform activity from one place.
          </p>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            padding: "12px 18px",
            borderRadius: "12px",
            fontWeight: "600",
          }}
        >
          CampusBites Admin
        </div>
      </div>

      {stats.pendingRestaurants > 0 && (
       <div className="admin-alert-banner">
        <span>
          ⚠ {stats.pendingRestaurants} restaurant
          {stats.pendingRestaurants > 1 ? "s" : ""}
          {" "}waiting for review
        </span>

        <button
          style={{
            background: "#F59E0B",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Review Now
        </button>
      </div>
    )}

      <div className="admin-stats-grid">
        {/* Total Restaurants */}
        <div
          style={{
            background: "#fff",
            padding: "24px",
            borderRadius: "16px",
            border: "1px solid #E2E8F0",
          }}
        >
          <p
            style={{
              color: "#64748B",
              marginBottom: "10px",
              fontWeight: "600",
            }}
          >
            Total Restaurants
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "42px",
            }}
          >
            {stats.totalRestaurants}
          </h1>
        </div>

        {/* Approved */}
        <div
          style={{
            background: "#F0FDF4",
            padding: "24px",
            borderRadius: "16px",
            border: "1px solid #BBF7D0",
          }}
        >
          <p
            style={{
              color: "#15803D",
              marginBottom: "10px",
              fontWeight: "600",
            }}
          >
            Active Restaurants
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "42px",
              color: "#15803D",
            }}
          >
            {stats.approvedRestaurants}
          </h1>
        </div>

        {/* Pending */}
        <div
          style={{
            background: "#FFFBEB",
            padding: "24px",
            borderRadius: "16px",
            border: "1px solid #FCD34D",
          }}
        >
          <p
            style={{
              color: "#D97706",
              marginBottom: "10px",
              fontWeight: "600",
            }}
          >
            Pending Reviews
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "42px",
              color: "#D97706",
            }}
          >
            {stats.pendingRestaurants}
          </h1>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <p
            style={{
              color: "#EA580C",
              marginBottom: "10px",
              fontWeight: "600",
            }}
          >
            Suspended Restaurants
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "42px",
              color: "#EA580C",
            }}
          >
            {stats.suspendedRestaurants || 0}
          </h1>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          marginTop: "40px",
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          padding: "24px",
        }}
      >
        <h2
          style={{
            marginTop: 0,
            marginBottom: "20px",
          }}
        >
          Quick Actions
        </h2>

        <div className="admin-actions">
          <button
            onClick={() =>
              (window.location.href =
                "/admin/restaurants")
            }
            style={{
              background: "#2563EB",
              color: "#fff",
              border: "none",
              padding: "14px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Manage Restaurants
          </button>

          <button
            onClick={() =>
              (window.location.href =
                "/admin/orders")
            }
            style={{
              background: "#0F172A",
              color: "#fff",
              border: "none",
              padding: "14px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            View Orders
          </button>
        </div>
      </div>

      {/* Recent Activity */}
<div
  style={{
    marginTop: "30px",
    background: "#fff",
    borderRadius: "16px",
    border: "1px solid #E2E8F0",
    padding: "24px",
  }}
>
  <h2
    style={{
      marginTop: 0,
      marginBottom: "20px",
    }}
  >
    Recent Activity
  </h2>

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    }}
  >
    {recentRestaurants.map((restaurant) => (
      <div
        key={restaurant.id}
        className="recent-activity-item"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "600",
          }}
        >
          <span>🏪</span>
          <span>{restaurant.name}</span>
        </div>

        <span
          style={{
            fontSize: "14px",
            color: "#64748B",
            fontWeight: "500",
            display: "block",
            marginTop: "6px",
          }}
        >
          📍 {restaurant.location}
        </span>
      </div>
    ))}
  </div>
</div>
            {/* Recent Restaurants */}
      <div
        style={{
          marginTop: "30px",
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          padding: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              margin: 0,
            }}
          >
            Recent Restaurants
          </h2>

          <button
            onClick={() =>
              (window.location.href =
                "/admin/restaurants")
            }
            style={{
              background: "transparent",
              color: "#2563EB",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            View All
          </button>
        </div>

        {restaurants.slice(0, 3).map((restaurant) => (
          <div
            key={restaurant.id}
            className="admin-restaurant-row"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <img
                src={restaurant.logo_url}
                alt={restaurant.name}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid #E2E8F0",
                }}
              />

              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "16px",
                  }}
                >
                  {restaurant.name}
                </h3>

                <p
                  style={{
                    margin: "4px 0 0",
                    color: "#64748B",
                    fontSize: "14px",
                  }}
                >
                  {restaurant.location}
                </p>
              </div>
            </div>

            <div
              className="restaurant-actions"
            >
              <span
                style={{
                  padding: "6px 12px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: "600",
                  background:
                    restaurant.status === "approved"
                      ? "#DCFCE7"
                      : restaurant.status === "suspended"
                      ? "#FEF3C7"
                      : "#FEE2E2",
                  color:
                    restaurant.status === "approved"
                      ? "#15803D"
                      : restaurant.status === "suspended"
                      ? "#D97706"
                      : "#DC2626",
                }}
              >
                {restaurant.status}
              </span>

              <Link
                to={`/admin/restaurants/${restaurant.id}`}
                style={{
                  background: "#2563EB",
                  color: "#fff",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;