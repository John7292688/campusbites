import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import {
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import {
  getNotifications,
  markNotificationAsRead,
} from "../../services/notificationService";
import { createSocket } from "../../socket";

const Topbar = ({ setSidebarOpen }) => {
  const socket = useMemo(
    () =>
      createSocket(
        localStorage.getItem("ownerToken")
      ),
    []
  );
  const [notifications, setNotifications] =
    useState([]);

  const [showNotifications, setShowNotifications] =
    useState(false);

  const notificationRef = useRef(null);  

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(
        event.target
      )
    ) {
      setShowNotifications(false);
    }
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);

    useEffect(() => {
      fetchNotifications();

      socket.on("connect", () => {
        console.log(
          "🟢 Socket connected:",
          socket.id
        );
      });

      socket.on(
        "new_notification",
        (notification) => {
          console.log(
            "🔔 New notification:",
            notification
          );

          fetchNotifications();
        }
      );

      return () => {
        socket.off("connect");
        socket.off("new_notification");
        socket.disconnect();
      };
    }, []);

const fetchNotifications = async () => {
  try {
    const data =
      await getNotifications();

    setNotifications(data);
  } catch (error) {
    console.error(error);
  }
};

const unreadCount = notifications.filter(
  (notification) => !notification.is_read
).length;
const handleNotificationClick = async (
  notificationId
) => {
  try {
    await markNotificationAsRead(
      notificationId
    );

    fetchNotifications();
  } catch (error) {
    console.error(error);
  }
};
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
        <button
          className="notification-btn"
          style={{
            position: "relative",
          }}
          onClick={() =>
            setShowNotifications(
              !showNotifications
            )
          }
        >
          <NotificationsNoneRoundedIcon />

          {unreadCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                background: "#EF4444",
                color: "#fff",
                borderRadius: "50%",
                minWidth: "18px",
                height: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: "bold",
                padding: "0 4px",
              }}
            >
              {unreadCount}
            </span>
          )}
        </button>

        {showNotifications && (
          <div
            ref={notificationRef}
            style={{
              position: "absolute",
              top: "60px",
              right: "20px",
              width: "320px",
              background: "#fff",
              borderRadius: "12px",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.15)",
              zIndex: 1000,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "14px",
                fontWeight: "600",
                borderBottom: "1px solid #eee",
              }}
            >
              Notifications
            </div>

            {notifications.length === 0 ? (
              <div
                style={{
                  padding: "16px",
                  color: "#666",
                }}
              >
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() =>
                    handleNotificationClick(
                      notification.id
                    )
                  }
                  style={{
                    padding: "14px",
                    borderBottom:
                      "1px solid #f3f4f6",
                    background:
                      notification.is_read
                        ? "#fff"
                        : "#F9FAFB",
                    cursor: "pointer",
                  }}
                >
                  <strong>
                    {notification.title}
                  </strong>

                  <div
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      marginTop: "4px",
                    }}
                  >
                    {notification.message}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

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