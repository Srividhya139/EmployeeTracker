import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, getToken } from "../../Services/authService"; // Correct named imports
import "./LoginSignup.css";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "ROLE_USER",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Register user
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      // Auto-login after signup
      await login({
        username: formData.username,
        password: formData.password,
      });

      // Navigate based on role
      if (formData.role === "ROLE_ADMIN") {
        navigate("/Admin/Dashboard");
      } else {
        navigate("/UserDashboard");
      }
    } catch (err) {
      setError(err.message || "Registration failed. Username or email may already exist.");
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <label className="auth-input-label">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            className="auth-input"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label className="auth-input-label">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="auth-input"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label className="auth-input-label">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="auth-input"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className="auth-input-label">Role</label>
          <select
            name="role"
            className="auth-input"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="ROLE_USER">User</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button">Sign up</button>
        </form>

        <div className="auth-toggle-container">
          <p>
            Already have an account?{" "}
            <span className="auth-link" onClick={() => navigate("/login")}>
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
