import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
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
      // Check credentials against localStorage
      const users = JSON.parse(localStorage.getItem("home2homeUsers") || "[]");
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        setShowSuccess(true);
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            email: user.email,
            fullName: user.fullName,
            userType: user.userType,
          })
        );

        setTimeout(() => {
          // Redirect based on user type: buyers -> /buy, sellers -> /sell
          if (user && user.userType === "seller") navigate("/sell");
          else navigate("/buy");
        }, 2500);
      } else {
        setErrors({
          submit:
            "Invalid email or password. Please try again or create a new account.",
        });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="login-container">
      {/* Background Animations */}
      <div className="animated-bg-login">
        <div className="floating-veggies-login">
          <span className="veggie-login veggie-login-1">🥕</span>
          <span className="veggie-login veggie-login-2">🥬</span>
          <span className="veggie-login veggie-login-3">🌽</span>
          <span className="veggie-login veggie-login-4">🍅</span>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="success-modal-login">
          <div className="success-content-login">
            <div className="success-icon-login">✓</div>
            <h2>Welcome Back!</h2>
            <p>You have logged in successfully</p>
            <p className="redirect-text-login">Returning to home...</p>
          </div>
        </div>
      )}

      {/* Login Form */}
      <div className="login-form-container">
        <div className="form-header-login">
          <h1>🥗 Welcome Back</h1>
          <p>Login to your Home2Home account</p>
        </div>

        {errors.submit && (
          <div className="alert-error">
            <span className="alert-icon">⚠️</span>
            <span>{errors.submit}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          {/* Email */}
          <div className="form-group-login">
            <label htmlFor="email">Email Address *</label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? "error" : ""}
              />
            </div>
            {errors.email && (
              <span className="error-message-login">{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className="form-group-login">
            <label htmlFor="password">Password *</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={errors.password ? "error" : ""}
              />
            </div>
            {errors.password && (
              <span className="error-message-login">{errors.password}</span>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="form-footer">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <button type="button" className="forgot-password-btn">
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-login-submit">
            Login
          </button>
        </form>

        {/* Signup Link */}
        <div className="signup-link">
          <p>
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="link-button-login"
            >
              Sign up here
            </button>
          </p>
        </div>

        {/* Demo Info */}
        <div className="demo-info">
          <p>
            <strong>Demo Credentials:</strong>
          </p>
          <p>Email: demo@home2home.com</p>
          <p>Password: demo123</p>
          <p className="demo-note">
            Or create a new account to test the signup feature
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
