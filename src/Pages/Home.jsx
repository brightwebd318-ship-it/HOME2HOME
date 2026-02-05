import "./Home.css";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

import logo from "../logo.svg";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Animated Background Elements */}
      <div className="animated-bg">
        <div className="floating-veggies">
          <span className="veggie veggie-1">🥕</span>
          <span className="veggie veggie-2">🥬</span>
          <span className="veggie veggie-3">🥒</span>
          <span className="veggie veggie-4">🌽</span>
          <span className="veggie veggie-5">🍅</span>
          <span className="veggie veggie-6">🥕</span>
        </div>
      </div>

      {/* Navigation Header */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <img src={logo} alt="Home2Home logo" className="site-logo" />
            <h2>Home2Home</h2>
          </div>
          <div className="nav-buttons">
            <button className="btn-login" onClick={() => navigate("/login")}>Login</button>
            <button className="btn-signup" onClick={() => navigate("/signup")}>Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Fresh Vegetables, Straight to Your Door</h1>
          <p className="hero-subtitle">
            Buy fresh, healthy vegetables from local farmers • Grow and sell your own produce
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/login")}>Start Shopping</button>
            <button className="btn-secondary" onClick={() => navigate("/signup")}>Become a Seller</button>
          </div>
        </div>

        {/* Animated Vegetables for Hero */}
        <div className="hero-veggies">
          <div className="veggie-card card-1">
            <span className="veggie-icon">🥕</span>
            <p>Carrots</p>
          </div>
          <div className="veggie-card card-2">
            <span className="veggie-icon">🥬</span>
            <p>Lettuce</p>
          </div>
          <div className="veggie-card card-3">
            <span className="veggie-icon">🌽</span>
            <p>Corn</p>
          </div>
          <div className="veggie-card card-4">
            <span className="veggie-icon">🍅</span>
            <p>Tomato</p>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <div className="feature-item">
          <div className="feature-icon">🌱</div>
          <h3>100% Fresh</h3>
          <p>Directly from farms</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🚚</div>
          <h3>Fast Delivery</h3>
          <p>Same day delivery available</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">💚</div>
          <h3>Healthy Living</h3>
          <p>Organic & pesticide-free options</p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
