import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/owner/Sidebar";
import Topbar from "../components/owner/Topbar";

import "../styles/ownerLayout.css";

const OwnerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="owner-layout">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="main-content">
        <Topbar
          setSidebarOpen={setSidebarOpen}
        />

        <main className="page-content">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default OwnerLayout;