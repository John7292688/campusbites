import { NavLink } from "react-router-dom";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

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
    name: "Combo Packages",
    path: "/owner/packages",
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

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>CampusBites</h2>
      </div>

      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/owner"}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>

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