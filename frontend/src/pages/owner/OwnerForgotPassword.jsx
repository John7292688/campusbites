import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../../styles/auth.css";

function OwnerForgotPassword() {
  const [email, setEmail] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/restaurant-auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message
        );
      }

      toast.success(
        "OTP sent successfully"
      );

      navigate(
        `/owner/verify-otp?email=${encodeURIComponent(
          email
        )}`
      );
    } catch (error) {
      toast.error(
        error.message ||
          "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-container">
        <h1>
          Owner Forgot Password
        </h1>

        <p>
          Enter your email address
          to receive an OTP.
        </p>

        <form onSubmit={handleSubmit}>
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

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="btn-spinner"></span>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default OwnerForgotPassword;