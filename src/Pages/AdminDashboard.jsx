import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("sales");
  const [adminUser, setAdminUser] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Sample data for sales and purchases
  const [salesData] = useState([
    {
      id: 1,
      buyer: "John Doe",
      email: "john@example.com",
      items: "Carrots, Tomatoes",
      quantity: "5 kg",
      price: "$25.50",
      date: "2026-01-29",
      status: "Delivered",
    },
    {
      id: 2,
      buyer: "Sarah Smith",
      email: "sarah@example.com",
      items: "Lettuce, Cucumber",
      quantity: "3 kg",
      price: "$18.75",
      date: "2026-01-28",
      status: "Shipped",
    },
    {
      id: 3,
      buyer: "Mike Johnson",
      email: "mike@example.com",
      items: "Spinach, Bell Pepper",
      quantity: "2.5 kg",
      price: "$22.00",
      date: "2026-01-27",
      status: "Processing",
    },
    {
      id: 4,
      buyer: "Emma Wilson",
      email: "emma@example.com",
      items: "Broccoli, Cauliflower",
      quantity: "4 kg",
      price: "$32.50",
      date: "2026-01-26",
      status: "Delivered",
    },
    {
      id: 5,
      buyer: "David Brown",
      email: "david@example.com",
      items: "Corn, Peas",
      quantity: "6 kg",
      price: "$28.00",
      date: "2026-01-25",
      status: "Delivered",
    },
  ]);

  const [purchasesData] = useState([
    {
      id: 101,
      seller: "Green Farm Co.",
      email: "greenfarm@example.com",
      items: "Organic Carrots",
      quantity: "50 kg",
      price: "$150.00",
      date: "2026-01-29",
      status: "Received",
    },
    {
      id: 102,
      seller: "Fresh Valley Ltd.",
      email: "freshvalley@example.com",
      items: "Tomatoes, Lettuce",
      quantity: "30 kg",
      price: "$95.50",
      date: "2026-01-28",
      status: "In Transit",
    },
    {
      id: 103,
      seller: "Organic Farms",
      email: "organicfarms@example.com",
      items: "Spinach",
      quantity: "20 kg",
      price: "$75.00",
      date: "2026-01-27",
      status: "Received",
    },
    {
      id: 104,
      seller: "Vegetable Paradise",
      email: "vegparadise@example.com",
      items: "Bell Peppers, Cucumber",
      quantity: "40 kg",
      price: "$120.00",
      date: "2026-01-26",
      status: "Received",
    },
    {
      id: 105,
      seller: "Farm Fresh Direct",
      email: "farmfreshdirect@example.com",
      items: "Broccoli, Cauliflower",
      quantity: "35 kg",
      price: "$105.25",
      date: "2026-01-25",
      status: "In Transit",
    },
  ]);

  useEffect(() => {
    // Check if user is logged in as admin
    const isAdminLoggedIn = JSON.parse(
      localStorage.getItem("adminLoggedIn") || "false"
    );
    const admin = JSON.parse(localStorage.getItem("adminUser") || "null");

    if (!isAdminLoggedIn || !admin) {
      navigate("/admin/login");
    } else {
      setAdminUser(admin);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
      case "Received":
        return "status-success";
      case "Shipped":
      case "In Transit":
        return "status-warning";
      case "Processing":
        return "status-info";
      default:
        return "status-default";
    }
  };

  const calculateStats = () => {
    const totalSales = salesData.reduce(
      (sum, item) => sum + parseFloat(item.price.replace("$", "")),
      0
    );
    const totalPurchases = purchasesData.reduce(
      (sum, item) => sum + parseFloat(item.price.replace("$", "")),
      0
    );
    return { totalSales, totalPurchases };
  };

  const stats = calculateStats();

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-branding">
            <h1>🛡️ Home2Home Admin Dashboard</h1>
            <p>Business Analytics & Management</p>
          </div>
          <div className="admin-user-info">
            <span className="admin-username">👤 {adminUser?.username}</span>
            <button
              className="admin-logout-btn"
              onClick={() => setShowLogoutConfirm(true)}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="admin-modal-buttons">
              <button
                className="admin-modal-btn cancel"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="admin-modal-btn confirm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="admin-container">
        {/* Stats Section */}
        <section className="admin-stats">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Total Sales</h3>
              <p className="stat-value">${stats.totalSales.toFixed(2)}</p>
              <span className="stat-subtext">{salesData.length} transactions</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <h3>Total Purchases</h3>
              <p className="stat-value">${stats.totalPurchases.toFixed(2)}</p>
              <span className="stat-subtext">{purchasesData.length} transactions</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>Active Buyers</h3>
              <p className="stat-value">{salesData.length}</p>
              <span className="stat-subtext">This month</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏪</div>
            <div className="stat-content">
              <h3>Active Sellers</h3>
              <p className="stat-value">{purchasesData.length}</p>
              <span className="stat-subtext">This month</span>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === "sales" ? "active" : ""}`}
            onClick={() => setActiveTab("sales")}
          >
            📊 Sales & Buyers
          </button>
          <button
            className={`admin-tab ${activeTab === "purchases" ? "active" : ""}`}
            onClick={() => setActiveTab("purchases")}
          >
            📦 Purchases & Sellers
          </button>
        </div>

        {/* Sales Table */}
        {activeTab === "sales" && (
          <section className="admin-table-section">
            <h2>Sales Details - Buyer Information</h2>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Buyer Name</th>
                    <th>Email</th>
                    <th>Items</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((sale) => (
                    <tr key={sale.id} className="table-row">
                      <td className="td-id">#{sale.id}</td>
                      <td className="td-name">{sale.buyer}</td>
                      <td className="td-email">{sale.email}</td>
                      <td className="td-items">{sale.items}</td>
                      <td className="td-quantity">{sale.quantity}</td>
                      <td className="td-price">{sale.price}</td>
                      <td className="td-date">{sale.date}</td>
                      <td className={`td-status ${getStatusColor(sale.status)}`}>
                        {sale.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Purchases Table */}
        {activeTab === "purchases" && (
          <section className="admin-table-section">
            <h2>Purchase Details - Seller Information</h2>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Seller Name</th>
                    <th>Email</th>
                    <th>Items</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {purchasesData.map((purchase) => (
                    <tr key={purchase.id} className="table-row">
                      <td className="td-id">#{purchase.id}</td>
                      <td className="td-name">{purchase.seller}</td>
                      <td className="td-email">{purchase.email}</td>
                      <td className="td-items">{purchase.items}</td>
                      <td className="td-quantity">{purchase.quantity}</td>
                      <td className="td-price">{purchase.price}</td>
                      <td className="td-date">{purchase.date}</td>
                      <td
                        className={`td-status ${getStatusColor(purchase.status)}`}
                      >
                        {purchase.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="admin-footer">
        <p>
          &copy; 2026 Home2Home Admin Dashboard | Authorized Access Only | Last
          Login: {adminUser?.loginTime ? new Date(adminUser.loginTime).toLocaleDateString() : ""}
        </p>
      </footer>
    </div>
  );
}

export default AdminDashboard;
