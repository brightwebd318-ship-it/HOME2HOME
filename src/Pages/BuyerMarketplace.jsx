import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BuyerMarketplace.css";
import Footer from "./Footer";

function BuyerMarketplace() {
  const navigate = useNavigate();
  const [products] = useState([
    { id: 1, emoji: "🥕", name: "Carrots", category: "root", price: 40, desc: "Fresh organic carrots" },
    { id: 2, emoji: "🍅", name: "Tomatoes", category: "fruit", price: 55, desc: "Vine-ripened tomatoes" },
    { id: 3, emoji: "🥬", name: "Lettuce", category: "leafy", price: 30, desc: "Crisp green lettuce" },
    { id: 4, emoji: "🥦", name: "Broccoli", category: "flower", price: 70, desc: "Fresh broccoli heads" },
    { id: 5, emoji: "🌽", name: "Corn", category: "grain", price: 25, desc: "Sweet corn cobs" },
    { id: 6, emoji: "🥒", name: "Cucumber", category: "leafy", price: 35, desc: "Cooling cucumbers" },
    { id: 7, emoji: "🫑", name: "Capsicum", category: "fruit", price: 80, desc: "Colorful bell peppers" },
    { id: 8, emoji: "🍃", name: "Spinach", category: "leafy", price: 45, desc: "Fresh spinach bunches" },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const filtered = products.filter((p) => {
    if (filter !== "all" && p.category !== filter) return false;
    if (!search) return true;
    return p.name.toLowerCase().includes(search.toLowerCase());
  });

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id, qty) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const checkout = () => {
    if (cart.length === 0) return alert("Your cart is empty");
    // Simple mock checkout: clear cart and show message
    setCart([]);
    localStorage.removeItem("cart");
    alert("Order placed! Thank you for buying from Home2Home.");
  };

  return (
    <div className="marketplace-page">
      <header className="market-header">
        <div className="header-inner">
          <h1>Home2Home Marketplace</h1>
          <div className="header-actions">
            <input
              className="search-input"
              placeholder="Search vegetables..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="cart-toggle" onClick={() => setCartOpen((s) => !s)}>
              🛒 ({cart.length})
            </button>
          </div>
        </div>
      </header>

      <main className="market-main">
        <aside className="filters">
          <h3>Categories</h3>
          <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
          <button className={`filter-btn ${filter === "leafy" ? "active" : ""}`} onClick={() => setFilter("leafy")}>Leafy</button>
          <button className={`filter-btn ${filter === "root" ? "active" : ""}`} onClick={() => setFilter("root")}>Root</button>
          <button className={`filter-btn ${filter === "fruit" ? "active" : ""}`} onClick={() => setFilter("fruit")}>Fruit</button>
          <button className={`filter-btn ${filter === "flower" ? "active" : ""}`} onClick={() => setFilter("flower")}>Flower</button>
          <button className={`filter-btn ${filter === "grain" ? "active" : ""}`} onClick={() => setFilter("grain")}>Grain</button>
        </aside>

        <section className="products-grid">
          {filtered.map((p) => (
            <div key={p.id} className="product-card">
              <div className="p-emoji">{p.emoji}</div>
              <h3>{p.name}</h3>
              <p className="p-desc">{p.desc}</p>
              <div className="p-footer">
                <span className="p-price">₹{p.price}/kg</span>
                <button className="add-btn" onClick={() => addToCart(p)}>Add</button>
              </div>
            </div>
          ))}
        </section>

        <aside className={`cart-sidebar ${cartOpen ? "open" : ""}`}>
          <h3>Your Cart</h3>
          {cart.length === 0 ? (
            <p className="empty">Cart is empty</p>
          ) : (
            <div className="cart-items">
              {cart.map((i) => (
                <div key={i.id} className="cart-item">
                  <div className="ci-left">
                    <div className="ci-emoji">{i.emoji}</div>
                    <div className="ci-info">
                      <strong>{i.name}</strong>
                      <span>₹{i.price}/kg</span>
                    </div>
                  </div>
                  <div className="ci-right">
                    <input type="number" value={i.qty} onChange={(e) => updateQty(i.id, parseInt(e.target.value || 1))} />
                    <button className="remove" onClick={() => removeFromCart(i.id)}>✖</button>
                  </div>
                </div>
              ))}

              <div className="cart-summary">
                <div>Subtotal: <strong>₹{subtotal.toFixed(2)}</strong></div>
                <button className="checkout-btn" onClick={checkout}>Proceed to Checkout</button>
              </div>
            </div>
          )}
        </aside>
      </main>

      <Footer />
    </div>
  );
}

export default BuyerMarketplace;
