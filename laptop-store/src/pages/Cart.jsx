import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal, clearCart, user } = useApp();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) { navigate("/login?redirect=checkout"); return; }
    navigate("/checkout");
  };

  if (cart.length === 0) return (
    <div className="cart-empty" data-testid="cart-empty">
      <div className="empty-icon">🛒</div>
      <h2>Your cart is empty</h2>
      <p>Looks like you haven't added anything yet.</p>
      <Link to="/" className="btn-primary">Browse Laptops</Link>
    </div>
  );

  const tax = cartTotal * 0.08;
  const shipping = cartTotal > 1000 ? 0 : 49;
  const total = cartTotal + tax + shipping;

  return (
    <div className="cart-page" data-testid="cart-page">
      <h1 className="page-title">Your Cart <span className="cart-item-count">({cart.length} item{cart.length !== 1 ? "s" : ""})</span></h1>

      <div className="cart-layout">
        <div className="cart-items" data-testid="cart-items">
          {cart.map(item => (
            <div className="cart-item" key={item.id} data-testid={`cart-item-${item.id}`}>
              <div className="cart-item-img">💻</div>
              <div className="cart-item-info">
                <div className="cart-item-brand">{item.brand}</div>
                <div className="cart-item-name" data-testid={`cart-name-${item.id}`}>{item.name}</div>
                <div className="cart-item-specs">{item.processorDetail} · {item.ram} · {item.storage}</div>
              </div>
              <div className="cart-item-controls">
                <div className="qty-control" data-testid={`cart-qty-${item.id}`}>
                  <button onClick={() => updateQty(item.id, item.qty - 1)} data-testid={`qty-dec-${item.id}`}>−</button>
                  <span data-testid={`qty-val-${item.id}`}>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} data-testid={`qty-inc-${item.id}`}>+</button>
                </div>
                <div className="cart-item-price" data-testid={`cart-price-${item.id}`}>
                  ${(item.price * item.qty).toLocaleString()}
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  data-testid={`remove-item-${item.id}`}
                >Remove</button>
              </div>
            </div>
          ))}

          <button className="clear-cart-btn" onClick={clearCart} data-testid="clear-cart">
            Clear Cart
          </button>
        </div>

        <div className="cart-summary" data-testid="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span data-testid="subtotal">${cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span data-testid="shipping">{shipping === 0 ? "FREE" : `$${shipping}`}</span>
          </div>
          <div className="summary-row">
            <span>Tax (8%)</span>
            <span data-testid="tax">${tax.toFixed(2)}</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-row total-row">
            <span>Total</span>
            <span data-testid="cart-total">${total.toFixed(2)}</span>
          </div>
          {shipping > 0 && (
            <p className="free-ship-note">Add ${(1000 - cartTotal).toFixed(0)} more for free shipping</p>
          )}
          <button className="btn-primary checkout-btn" onClick={handleCheckout} data-testid="checkout-btn">
            Proceed to Checkout
          </button>
          <Link to="/" className="continue-shopping" data-testid="continue-shopping">← Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
