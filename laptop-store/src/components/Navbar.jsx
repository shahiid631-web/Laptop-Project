import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { cartCount, user, logout } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal("");
    }
  };

  return (
    <nav className="navbar" data-testid="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" data-testid="logo">
          <span className="logo-icon">⬡</span>
          <span className="logo-text">TechDesk</span>
        </Link>

        <form onSubmit={handleSearch} className="navbar-search" data-testid="search-form">
          <input
            type="text"
            placeholder="Search laptops…"
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            className="search-input"
            data-testid="search-input"
          />
          <button type="submit" className="search-btn" data-testid="search-btn">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </button>
        </form>

        <div className="navbar-actions">
          {user ? (
            <div className="user-menu" data-testid="user-menu">
              <span className="user-greeting">Hi, {user.name.split(" ")[0]}</span>
              <button onClick={logout} className="btn-ghost" data-testid="logout-btn">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="btn-ghost" data-testid="login-link">Login</Link>
          )}
          <Link to="/cart" className="cart-btn" data-testid="cart-icon">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {cartCount > 0 && <span className="cart-badge" data-testid="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}
