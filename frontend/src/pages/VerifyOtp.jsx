import { useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/auth.css";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();
  const [searchParams] =
    useSearchParams();

  const email =
    searchParams.get("email");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
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
        "OTP verified successfully"
      );

      navigate(
        `/reset-password?email=${encodeURIComponent(
          email
        )}&otp=${otp}`
      );
    } catch (error) {
      toast.error(
        error.message ||
          "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-container">
        <h1>Verify OTP</h1>

        <p>
          Enter the OTP sent to your
          email address.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>OTP Code</label>

            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value)
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
              "Verify OTP"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default VerifyOtp;