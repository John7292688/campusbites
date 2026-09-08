import { useState } from "react";
import {
  useNavigate,
  Link,
} from "react-router-dom";
import { toast } from "react-toastify";
import { requestNotificationPermission } from "../../firebase";

import "../../styles/auth.css";
import { loginRestaurantOwner } from "../../services/restaurantOwnerAuthService";

function OwnerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const fcmToken =
        await requestNotificationPermission();

      const data =
        await loginRestaurantOwner(
          email,
          password,
          fcmToken
        );

      localStorage.setItem(
        "ownerToken",
        data.token
      );

      localStorage.setItem(
        "restaurantOwner",
        JSON.stringify(data.owner)
      );

      toast.success(
        "Login successful!"
      );

      setTimeout(() => {
        navigate("/owner/dashboard");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-container">
        <h1>
          Restaurant Owner Login
        </h1>

        <p>
          Login to manage your
          restaurant.
        </p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />
          </div>

          <div
            style={{
              textAlign: "right",
              marginBottom: "20px",
            }}
          >
            <Link
              to="/owner/forgot-password"
              style={{
                color: "#2563eb",
                textDecoration:
                  "none",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="btn-spinner"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default OwnerLogin;