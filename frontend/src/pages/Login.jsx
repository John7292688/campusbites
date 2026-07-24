import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import { loginStudent } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
  e.preventDefault();

  try {
    const data = await loginStudent(email, password);

    console.log(data);

    localStorage.setItem("token", data.token);

    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "student",
      JSON.stringify(data.student)
    );

    alert("Login successful!");

    navigate("/");
  } catch (error) {
    alert(error.message);
  }
}

  return (
    <section className="auth-page">
      <div className="auth-container">
        <h1>Welcome Back</h1>
        <p>Login to your CampusBites account</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

export default Login;