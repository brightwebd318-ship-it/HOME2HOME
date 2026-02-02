import "./Footer.css";
import { useNavigate } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-section">
          <h3 className="footer-title">
            <img src="/logo.svg" alt="Home2Home logo" className="footer-logo-img" /> Home2Home
          </h3>
          <p className="footer-description">
            Connecting farmers and food enthusiasts through fresh, organic vegetables delivered straight to your door.
          </p>
          <div className="social-links">
            <a href="#facebook" className="social-icon" title="Facebook">
              f
            </a>
            <a href="#twitter" className="social-icon" title="Twitter">
              𝕏
            </a>
            <a href="#instagram" className="social-icon" title="Instagram">
              📷
            </a>
            <a href="#linkedin" className="social-icon" title="LinkedIn">
              in
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-section-title">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#shop">Shop</a>
            </li>
            <li>
              <a href="#sellers">Become a Seller</a>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h4 className="footer-section-title">Support</h4>
          <ul className="footer-links">
            <li>
              <a href="#contact">Contact Us</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="#shipping">Shipping Info</a>
            </li>
            <li>
              <a href="#returns">Returns</a>
            </li>
            <li>
              <a href="#track">Track Order</a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer-section">
          <h4 className="footer-section-title">Legal</h4>
          <ul className="footer-links">
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="#terms">Terms of Service</a>
            </li>
            <li>
              <a href="#cookies">Cookie Policy</a>
            </li>
            <li>
              <a href="#disclaimer">Disclaimer</a>
            </li>
            <li>
              <a href="#accessibility">Accessibility</a>
            </li>
            <li>
              <button
                onClick={() => navigate("/admin/login")}
                className="admin-footer-link"
                title="Admin Portal"
              >
                🛡️ Admin Portal
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4 className="footer-section-title">Get in Touch</h4>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <a href="mailto:support@home2home.com">support@home2home.com</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <a href="tel:+1234567890">+1 (234) 567-890</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <p>123 Farm Road, Green Valley, CV 12345</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            &copy; {currentYear} Home2Home. All rights reserved. | Made with
            <span className="heart">❤️</span>for food lovers
          </p>
          <div className="payment-methods">
            <span className="payment-icon">💳</span>
            <span className="payment-icon">🏦</span>
            <span className="payment-icon">📱</span>
            <span className="payment-label">Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
