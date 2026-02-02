import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Sell.css";
import Footer from "./Footer";

function Sell() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("add-product");

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    image: "🥬",
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Load products from localStorage on mount
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/login");
    }

    const savedProducts = localStorage.getItem("sellerProducts");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, [navigate]);

  const vegetables = {
    "🥕": "Carrots",
    "🍅": "Tomatoes",
    "🥬": "Lettuce",
    "🥦": "Broccoli",
    "🌽": "Corn",
    "🥒": "Cucumber",
    "🫑": "Pepper",
    "🍃": "Spinach",
    "🥔": "Potato",
    "🧅": "Onion",
  };

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

  const handleImageSelect = (emoji) => {
    setFormData((prev) => ({
      ...prev,
      image: emoji,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.productName.trim()) newErrors.productName = "Product name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Valid price is required";
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = "Valid quantity is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      const newProduct = {
        id: Date.now(),
        ...formData,
        dateAdded: new Date().toLocaleDateString(),
      };

      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem("sellerProducts", JSON.stringify(updatedProducts));

      setFormData({
        productName: "",
        category: "",
        price: "",
        quantity: "",
        description: "",
        image: "🥬",
      });

      setSuccessMessage("Product added successfully! 🎉");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      setErrors(newErrors);
    }
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("sellerProducts", JSON.stringify(updatedProducts));
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // Calculate statistics
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const totalQuantity = products.reduce((sum, p) => sum + parseInt(p.quantity), 0);

  return (
    <div className="sell-page">
      {/* Header */}
      <div className="sell-header">
        <div className="header-content">
          <div className="sell-brand">
            <img src="/logo.svg" alt="Home2Home" className="site-logo-small" />
            <h1>Home2Home Seller Dashboard</h1>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="stats-section">
        <div className="stat-card">
          <h3>📦 Total Products</h3>
          <p className="stat-number">{totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>📊 Total Quantity</h3>
          <p className="stat-number">{totalQuantity}</p>
        </div>
        <div className="stat-card">
          <h3>💰 Inventory Value</h3>
          <p className="stat-number">₹{totalValue.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>⭐ Rating</h3>
          <p className="stat-number">4.8/5</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === "add-product" ? "active" : ""}`}
          onClick={() => setActiveTab("add-product")}
        >
          ➕ Add Product
        </button>
        <button
          className={`tab-btn ${activeTab === "my-products" ? "active" : ""}`}
          onClick={() => setActiveTab("my-products")}
        >
          📋 My Products ({totalProducts})
        </button>
      </div>

      {/* Success Message */}
      {showSuccess && <div className="success-message">{successMessage}</div>}

      {/* Tab Content */}
      <div className="tab-content">
        {/* Add Product Tab */}
        {activeTab === "add-product" && (
          <div className="add-product-section">
            <h2>Add New Product</h2>
            <form onSubmit={handleAddProduct} className="product-form">
              {/* Product Name */}
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className={errors.productName ? "error" : ""}
                />
                {errors.productName && (
                  <span className="error-text">{errors.productName}</span>
                )}
              </div>

              {/* Category */}
              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={errors.category ? "error" : ""}
                >
                  <option value="">Select Category</option>
                  <option value="leafy">Leafy Vegetables</option>
                  <option value="root">Root Vegetables</option>
                  <option value="fruit">Fruity Vegetables</option>
                  <option value="legumes">Legumes</option>
                  <option value="others">Others</option>
                </select>
                {errors.category && (
                  <span className="error-text">{errors.category}</span>
                )}
              </div>

              {/* Price & Quantity */}
              <div className="form-row">
                <div className="form-group">
                  <label>Price per kg (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className={errors.price ? "error" : ""}
                  />
                  {errors.price && (
                    <span className="error-text">{errors.price}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Quantity (kg) *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="0"
                    className={errors.quantity ? "error" : ""}
                  />
                  {errors.quantity && (
                    <span className="error-text">{errors.quantity}</span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your product (freshness, origin, etc.)"
                  rows="4"
                  className={errors.description ? "error" : ""}
                />
                {errors.description && (
                  <span className="error-text">{errors.description}</span>
                )}
              </div>

              {/* Image Selection */}
              <div className="form-group">
                <label>Select Product Image</label>
                <div className="image-selector">
                  {Object.entries(vegetables).map(([emoji, name]) => (
                    <button
                      key={emoji}
                      type="button"
                      className={`emoji-btn ${
                        formData.image === emoji ? "selected" : ""
                      }`}
                      onClick={() => handleImageSelect(emoji)}
                      title={name}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="submit-btn">
                ➕ Add Product
              </button>
            </form>
          </div>
        )}

        {/* My Products Tab */}
        {activeTab === "my-products" && (
          <div className="my-products-section">
            <h2>My Products</h2>
            {products.length === 0 ? (
              <div className="no-products">
                <p>No products added yet.</p>
                <button
                  className="add-first-btn"
                  onClick={() => setActiveTab("add-product")}
                >
                  Add your first product
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {products.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-image">{product.image}</div>
                    <div className="product-info">
                      <h3>{product.productName}</h3>
                      <p className="category">
                        <strong>Category:</strong> {product.category}
                      </p>
                      <p className="description">{product.description}</p>
                      <div className="product-details">
                        <span className="price">₹{product.price}/kg</span>
                        <span className="quantity">{product.quantity} kg</span>
                      </div>
                      <p className="date-added">Added: {product.dateAdded}</p>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Sell;
