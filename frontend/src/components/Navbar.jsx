import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";
import {
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { createSocket } from "../socket";
import {
  getStudentNotifications,
  markNotificationAsRead,
} from "../services/studentNotificationService";

function Navbar({ openCart }) {
  const { cartCount } = useCart();

  const [notificationCount, setNotificationCount] =
    useState(0);

  const [notifications, setNotifications] =
    useState([]);

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const notificationRef = useRef(null);

  const [showProfileMenu, setShowProfileMenu] =
  useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

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

  const socket = useMemo(
    () =>
      createSocket(
        localStorage.getItem("token")
      ),
    []
  );

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const notifications =
          await getStudentNotifications();

        setNotifications(notifications);

        const unreadCount =
          notifications.filter(
            (notification) =>
              !notification.is_read
          ).length;

        setNotificationCount(unreadCount);
      } catch (error) {
        console.error(
          "Failed to load notifications:",
          error
        );
      }
    };

    loadNotifications();

    socket.on(
      "new_student_notification",
      (notification) => {
        setNotifications((prev) => [
          notification,
          ...prev,
        ]);

        setNotificationCount(
          (prev) => prev + 1
        );

        toast.info(
          `${notification.title}\n${notification.message}`,
          {
            position: "top-right",
            autoClose: 5000,
          }
        );
      }
    );

    return () => {
      socket.off(
        "new_student_notification"
      );
    };
  }, [socket]);

  const isLoggedIn =
    !!localStorage.getItem("token");

  const student = JSON.parse(
    localStorage.getItem("student")
  );  

  const closeMobileMenu = () =>
    setMobileMenuOpen(false);

  return (
    <>
      <header className="navbar">
        <div className="container navbar-container">
          <Link
            to="/"
            className="logo"
          >
            Campus<span>Bites</span>
          </Link>

          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/restaurants">
              Restaurants
            </Link>
            <Link to="/packages">
              Packages
            </Link>
            <Link to="/my-orders">
              Orders
            </Link>

            <Link to="/contact">
              Contact
            </Link>
          </nav>

          <div className="nav-actions">
            {!isLoggedIn && (
              <>
                <Link to="/login">
                  <button className="login-btn">
                    Login
                  </button>
                </Link>

                <Link to="/register">
                  <button className="signup-btn">
                    Sign Up
                  </button>
                </Link>
              </>
            )}

            <button
              className="notification-btn"
              onClick={() =>
                setShowNotifications(
                  (prev) => !prev
                )
              }
            >
              🔔

              {notificationCount > 0 && (
                <span>
                  {notificationCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div
                ref={notificationRef}
                className="notification-dropdown"
              >
                <h4>Notifications</h4>

                {notifications.length === 0 ? (
                  <p>
                    No notifications yet.
                  </p>
                ) : (
                  notifications.map(
                    (notification) => (
                      <div
                        key={notification.id}
                        className="notification-item"
                      >
                        <strong>
                          {
                            notification.title
                          }
                        </strong>

                        <p>
                          {
                            notification.message
                          }
                        </p>

                        <div className="notification-actions">
                          <span
                            onClick={async () => {
                              try {
                                setNotifications(
                                  (
                                    prev
                                  ) =>
                                    prev.map(
                                      (
                                        item
                                      ) =>
                                        item.id ===
                                        notification.id
                                          ? {
                                              ...item,
                                              is_read: true,
                                            }
                                          : item
                                    )
                                );

                                setNotificationCount(
                                  (
                                    prev
                                  ) =>
                                    Math.max(
                                      prev - 1,
                                      0
                                    )
                                );

                                await markNotificationAsRead(
                                  notification.id
                                );
                              } catch (
                                error
                              ) {
                                console.error(
                                  error
                                );
                              }
                            }}
                          >
                            {notification.is_read
                              ? "✅"
                              : "📩"}
                          </span>
                        </div>

                        <small>
                          {new Date(
                            notification.created_at
                          ).toLocaleString(
                            "en-GB"
                          )}
                        </small>
                      </div>
                    )
                  )
                )}
              </div>
            )}

            {isLoggedIn && (
              <div
                className="profile-wrapper"
              >
                <button
                  className="profile-btn"
                  onClick={() =>
                    setShowProfileMenu(
                      !showProfileMenu
                    )
                  }
                >
                  <FaUserCircle />
                </button>

                {showProfileMenu && (
                  <div className="profile-dropdown">
                    <Link
                      to="/profile"
                      onClick={() =>
                        setShowProfileMenu(false)
                      }
                    >
                      My Profile
                    </Link>

                    <Link
                      to="/my-orders"
                      onClick={() =>
                        setShowProfileMenu(false)
                      }
                    >
                      My Orders
                    </Link>

                    <button
                      onClick={() => {
                        localStorage.removeItem(
                          "token"
                        );

                        localStorage.removeItem(
                          "student"
                        );

                        window.location.href =
                          "/";
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              className="cart-btn"
              onClick={openCart}
            >
              🛒
              <span>{cartCount}</span>
            </button>

            <button
              className="menu-btn"
              onClick={() =>
                setMobileMenuOpen(
                  (prev) => !prev
                )
              }
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
      <>
        <div
          className="mobile-menu-overlay"
          onClick={closeMobileMenu}
        />

        <div className="mobile-menu">
          <button
            className="close-menu-btn"
            onClick={closeMobileMenu}
          >
            ✕
          </button>
          <Link
            to="/"
            onClick={closeMobileMenu}
          >
            Home
          </Link>

          <Link
            to="/restaurants"
            onClick={closeMobileMenu}
          >
            Restaurants
          </Link>

          <Link
            to="/packages"
            onClick={closeMobileMenu}
          >
            Packages
          </Link>

          <Link
            to="/my-orders"
            onClick={closeMobileMenu}
          >
            Orders
          </Link>

          {isLoggedIn && (
            <Link
              to="/profile"
              onClick={closeMobileMenu}
            >
              Profile
            </Link>
          )}

          <Link
            to="/contact"
            onClick={closeMobileMenu}
          >
            Contact
          </Link>

          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                onClick={closeMobileMenu}
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <div className="mobile-menu-header">
          <span className="logo">
            Campus<span>Bites</span>
          </span>
        </div>
        </>
      )}
    </>
  );
}

export default Navbar;