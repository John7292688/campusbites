import {
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useState } from "react";

import "../styles/adminLayout.css";

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const isActive = (path) =>
    location.pathname.includes(path);

  return (
    <div className="admin-layout">
      {/* Sidebar */}

      <aside
        className={`admin-sidebar ${
          sidebarOpen ? "open" : ""
        }`}
      >
        <div className="admin-logo">
          <h2>CampusBites</h2>

          <p>Admin Panel</p>

          <div className="admin-user">
            <div className="admin-user-name">
              Moses Olotu (ZZMOSK)
            </div>

            <div className="admin-user-role">
              System Administrator
            </div>
          </div>
        </div>

        <nav className="admin-nav">
          <Link
            to="/admin/dashboard"
            className={`admin-link ${
              location.pathname ===
              "/admin/dashboard"
                ? "active"
                : ""
            }`}
          >
            🏠 Dashboard
          </Link>

          <Link
            to="/admin/restaurants"
            className={`admin-link ${
              isActive("/admin/restaurants")
                ? "active"
                : ""
            }`}
          >
            🍽 Restaurants
          </Link>

          <Link
            to="/admin/package-categories"
            className={`admin-link ${
              isActive(
                "/admin/package-categories"
              )
                ? "active"
                : ""
            }`}
          >
            📦 Categories
          </Link>

          <Link
            to="/admin/delivery-locations"
            className={`admin-link ${
              isActive("/admin/delivery-locations")
                ? "active"
                : ""
            }`}
          >
            🚚 Delivery Locations
          </Link>

          <Link
            to="/admin/orders"
            className={`admin-link ${
              isActive("/admin/orders")
                ? "active"
                : ""
            }`}
          >
            🛒 Orders
          </Link>

          <Link
            to="/admin/messages"
            className={`admin-link ${
              isActive("/admin/messages")
                ? "active"
                : ""
            }`}
          >
            📩 Messages
          </Link>

          <Link
            to="/admin/settings"
            className={`admin-link ${
              isActive("/admin/settings")
                ? "active"
                : ""
            }`}
          >
            ⚙ Settings
          </Link>

          <div className="admin-divider" />

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Main */}

      <div className="admin-content">
        <div className="mobile-topbar">
          <button
            className="menu-btn"
            onClick={() =>
              setSidebarOpen(true)
            }
          >
            ☰
          </button>

          <h2>CampusBites</h2>
        </div>

        <Outlet />
      </div>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}
    </div>
  );
}

export default AdminLayout;