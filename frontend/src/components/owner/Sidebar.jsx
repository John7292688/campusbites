import { NavLink } from "react-router-dom";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const menuItems = [
  {
    name: "Dashboard",
    path: "/owner",
    icon: <DashboardRoundedIcon />,
  },
  {
    name: "Restaurant",
    path: "/owner/restaurant",
    icon: <StoreRoundedIcon />,
  },

  {
    name: "Package Categories",
    path: "/owner/package-categories",
    icon: <RestaurantMenuRoundedIcon />,
  },
  {
    name: "Combo Packages",
    path: "/owner/packages",
    icon: <RestaurantMenuRoundedIcon />,
  },

  {
    name: "Menu Categories",
    path: "/owner/menu-categories",
    icon: <RestaurantMenuRoundedIcon />,
  },
  {
    name: "Menu Items",
    path: "/owner/menu-items",
    icon: <RestaurantMenuRoundedIcon />,
  },

  {
    name: "Orders",
    path: "/owner/orders",
    icon: <ShoppingBagRoundedIcon />,
  },
  {
    name: "Customers",
    path: "/owner/customers",
    icon: <PeopleRoundedIcon />,
  },
  {
    name: "Settings",
    path: "/owner/settings",
    icon: <SettingsRoundedIcon />,
  },
];

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <aside
      className={`sidebar ${
        sidebarOpen ? "open" : ""
      }`}
    >
      <div className="logo">
        <h2>CampusBites</h2>

        <button
          className="close-sidebar"
          onClick={() =>
            setSidebarOpen(false)
          }
        >
          <CloseRoundedIcon />
        </button>
      </div>

      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/owner"}
            onClick={() =>
              setSidebarOpen(false)
            }
            className={({ isActive }) =>
              `sidebar-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span className="sidebar-icon">
              {item.icon}
            </span>

            <span>{item.name}</span>
          </NavLink>
        ))}

        <button className="logout-btn">
          <LogoutRoundedIcon />

          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;