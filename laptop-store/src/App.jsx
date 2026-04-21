import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import "./styles.css";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <div className="page-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
        <footer className="footer" data-testid="footer">
          <div className="footer-inner">
            <span className="logo-text">⬡ TechDesk</span>
            <span>© 2025 TechDesk. Built for Cypress automation showcase.</span>
          </div>
        </footer>
      </BrowserRouter>
    </AppProvider>
  );
}
