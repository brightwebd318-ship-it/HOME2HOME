import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";
import Sell from "./Pages/Sell";
import BuyerMarketplace from "./Pages/BuyerMarketplace";

function App() {
  useEffect(() => {
    // Initialize demo account if no users exist
    const existingUsers = localStorage.getItem("home2homeUsers");
    if (!existingUsers) {
      const demoUser = [
        {
          email: "demo@home2home.com",
          password: "demo123",
          fullName: "Demo User",
          phone: "1234567890",
          userType: "buyer",
        },
      ];
      localStorage.setItem("home2homeUsers", JSON.stringify(demoUser));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/buy" element={<BuyerMarketplace />} />
      </Routes>
    </Router>
  );
}

export default App;