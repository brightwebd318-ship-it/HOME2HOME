import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Admin credentials (can be changed)
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "admin123";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      if (
        formData.username === ADMIN_USERNAME &&
        formData.password === ADMIN_PASSWORD
      ) {
        setShowSuccess(true);
        localStorage.setItem("adminLoggedIn", JSON.stringify(true));
        localStorage.setItem(
          "adminUser",
          JSON.stringify({
            username: ADMIN_USERNAME,
            loginTime: new Date().toISOString(),
          })
        );

        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 2000);
      } else {
        setErrors({
          submit:
            "Invalid username or password. Please try again with correct admin credentials.",
        });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="admin-login-container">
      {/* Background Animations */}
      <div className="admin-bg">
        <div className="admin-floating-elements">
          <span className="admin-element admin-e1">📊</span>
          <span className="admin-element admin-e2">💼</span>
          <span className="admin-element admin-e3">🔐</span>
          <span className="admin-element admin-e4">📈</span>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="admin-success-modal">
          <div className="admin-success-content">
            <div className="admin-success-icon">✓</div>
            <h2>Welcome Admin!</h2>
            <p>Access granted to dashboard</p>
            <p className="admin-redirect-text">Loading dashboard...</p>
          </div>
        </div>
      )}

      {/* Admin Login Form */}
      <div className="admin-login-form-container">
        <div className="admin-form-header">
          <div className="admin-badge">🛡️</div>
          <h1>Home2Home Admin Portal</h1>
          <p>Restricted Access - Admin Only</p>
        </div>

        {errors.submit && (
          <div className="admin-alert-error">
            <span className="admin-alert-icon">⚠️</span>
            <span>{errors.submit}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          {/* Username */}
          <div className="admin-form-group">
            <label htmlFor="username">Username *</label>
            <div className="admin-input-wrapper">
              <span className="admin-input-icon">👤</span>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter admin username"
                className={errors.username ? "error" : ""}
                autoComplete="off"
              />
            </div>
            {errors.username && (
              <span className="admin-error-message">{errors.username}</span>
            )}
          </div>

          {/* Password */}
          <div className="admin-form-group">
            <label htmlFor="password">Password *</label>
            <div className="admin-input-wrapper">
              <span className="admin-input-icon">🔑</span>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter admin password"
                className={errors.password ? "error" : ""}
                autoComplete="off"
              />
            </div>
            {errors.password && (
              <span className="admin-error-message">{errors.password}</span>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="admin-btn-submit">
            Access Dashboard
          </button>
        </form>

        {/* Back to Home */}
        <div className="admin-back-link">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="admin-link-button"
          >
            ← Back to Home2Home
          </button>
        </div>

        {/* Security Notice */}
        <div className="admin-security-notice">
          <p>
            <strong>⚠️ Security Notice:</strong>
          </p>
          <p>
            This is a restricted area. Only authorized administrators should
            access this portal.
          </p>
          <p className="admin-credentials-hint">
            <strong>Demo Credentials:</strong>
            <br />
            Username: admin
            <br />
            Password: admin123
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
