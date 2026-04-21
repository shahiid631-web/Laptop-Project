import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cart")) || []; } catch { return []; }
  });
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user")) || null; } catch { return null; }
  });
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wishlist")) || []; } catch { return []; }
  });

  useEffect(() => { localStorage.setItem("cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("user", JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem("wishlist", JSON.stringify(wishlist)); }, [wishlist]);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(u => u.email === email && u.password === password);
    if (found) { setUser(found); return { success: true }; }
    return { success: false, error: "Invalid email or password" };
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.email === email)) return { success: false, error: "Email already registered" };
    const newUser = { id: Date.now(), name, email, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    setUser(newUser);
    return { success: true };
  };

  const logout = () => setUser(null);

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal,
      user, login, register, logout,
      wishlist, toggleWishlist
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
