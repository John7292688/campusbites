import { Outlet } from "react-router-dom";

import Sidebar from "../components/owner/Sidebar";
import Topbar from "../components/owner/Topbar";

import "../styles/ownerLayout.css";

const OwnerLayout = () => {
  return (
    <div className="owner-layout">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;