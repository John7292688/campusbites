import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/auth.css";
import { loginRestaurantOwner } from "../../services/restaurantOwnerAuthService";

function OwnerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const data = await loginRestaurantOwner(email, password);

      localStorage.setItem("ownerToken", data.token);

      localStorage.setItem(
        "restaurantOwner",
        JSON.stringify(data.owner)
      );

      alert("Restaurant owner login successful!");

      navigate("/owner/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Login failed."
      );
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-container">
        <h1>Restaurant Owner Login</h1>

        <p>Login to manage your restaurant.</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
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
                setPassword(e.target.value)
              }
              required
            />
          </div>

          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default OwnerLogin;