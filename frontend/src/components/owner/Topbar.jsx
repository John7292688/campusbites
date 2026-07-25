import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const Topbar = ({ setSidebarOpen }) => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          <MenuRoundedIcon />
        </button>

        <div className="search-box">
          <SearchRoundedIcon className="search-icon" />

          <input
            type="text"
            placeholder="Search packages, orders, customers..."
          />
        </div>
      </div>

      <div className="topbar-right">
        <button className="notification-btn">
          <NotificationsNoneRoundedIcon />
          <span className="notification-dot"></span>
        </button>

        <div className="profile">
          <div className="avatar">
            R
          </div>

          <div className="profile-info">
            <strong>Restaurant Owner</strong>
            <small>Welcome back!</small>
          </div>

          <KeyboardArrowDownRoundedIcon />
        </div>
      </div>
    </header>
  );
};

export default Topbar;