import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const STEPS = ["Shipping", "Payment", "Review"];

export default function Checkout() {
  const { cart, cartTotal, clearCart, user } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId] = useState(() => "TD" + Math.random().toString(36).substr(2, 8).toUpperCase());
  const [shipping, setShipping] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "", address: "", city: "", state: "", zip: "", country: "US"
  });
  const [payment, setPayment] = useState({
    cardName: "", cardNumber: "", expiry: "", cvv: ""
  });
  const [errors, setErrors] = useState({});

  const shippingFee = cartTotal > 1000 ? 0 : 49;
  const tax = cartTotal * 0.08;
  const total = cartTotal + tax + shippingFee;

  const setS = (k, v) => { setShipping(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); };
  const setP = (k, v) => { setPayment(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); };

  const fmtCard = v => v.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);
  const fmtExp = v => {
    const d = v.replace(/\D/g, "");
    return d.length >= 2 ? d.slice(0, 2) + "/" + d.slice(2, 4) : d;
  };

  const validateShipping = () => {
    const e = {};
    if (!shipping.firstName.trim()) e.firstName = "Required";
    if (!shipping.lastName.trim()) e.lastName = "Required";
    if (!shipping.email.trim() || !/\S+@\S+\.\S+/.test(shipping.email)) e.email = "Valid email required";
    if (!shipping.address.trim()) e.address = "Required";
    if (!shipping.city.trim()) e.city = "Required";
    if (!shipping.zip.trim()) e.zip = "Required";
    return e;
  };

  const validatePayment = () => {
    const e = {};
    if (!payment.cardName.trim()) e.cardName = "Required";
    if (payment.cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Enter valid 16-digit card number";
    if (!payment.expiry || payment.expiry.length < 5) e.expiry = "Enter valid expiry";
    if (!payment.cvv || payment.cvv.length < 3) e.cvv = "Enter valid CVV";
    return e;
  };

  const handleNext = () => {
    if (step === 0) {
      const e = validateShipping();
      if (Object.keys(e).length) { setErrors(e); return; }
    }
    if (step === 1) {
      const e = validatePayment();
      if (Object.keys(e).length) { setErrors(e); return; }
    }
    setErrors({});
    setStep(s => s + 1);
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (!cart.length && !orderPlaced) return (
    <div className="cart-empty" data-testid="checkout-empty">
      <div className="empty-icon">🛒</div>
      <h2>Nothing to checkout</h2>
      <Link to="/" className="btn-primary">Browse Laptops</Link>
    </div>
  );

  if (orderPlaced) return (
    <div className="order-success" data-testid="order-success">
      <div className="success-icon">✓</div>
      <h1>Order Confirmed!</h1>
      <p className="order-id" data-testid="order-id">Order #{orderId}</p>
      <p>Thank you, {shipping.firstName}! A confirmation has been sent to <strong>{shipping.email}</strong>.</p>
      <div className="success-perks">
        <span>🚚 Ships in 1–2 business days</span>
        <span>📦 Free tracking included</span>
      </div>
      <Link to="/" className="btn-primary" data-testid="back-to-home">Continue Shopping</Link>
    </div>
  );

  return (
    <div className="checkout-page" data-testid="checkout-page">
      <h1 className="page-title">Checkout</h1>

      {/* Stepper */}
      <div className="checkout-stepper" data-testid="checkout-stepper">
        {STEPS.map((s, i) => (
          <div key={s} className={`step-item ${i === step ? "active" : ""} ${i < step ? "done" : ""}`}
            data-testid={`step-${s.toLowerCase()}`}>
            <div className="step-circle">{i < step ? "✓" : i + 1}</div>
            <span>{s}</span>
          </div>
        ))}
      </div>

      <div className="checkout-layout">
        <div className="checkout-form-area">

          {/* STEP 0: Shipping */}
          {step === 0 && (
            <div className="checkout-section" data-testid="shipping-form">
              <h2>Shipping Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input value={shipping.firstName} onChange={e => setS("firstName", e.target.value)}
                    className={errors.firstName ? "input-error" : ""} data-testid="input-first-name" placeholder="John"/>
                  {errors.firstName && <span className="field-error" data-testid="error-first-name">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input value={shipping.lastName} onChange={e => setS("lastName", e.target.value)}
                    className={errors.lastName ? "input-error" : ""} data-testid="input-last-name" placeholder="Doe"/>
                  {errors.lastName && <span className="field-error" data-testid="error-last-name">{errors.lastName}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={shipping.email} onChange={e => setS("email", e.target.value)}
                    className={errors.email ? "input-error" : ""} data-testid="input-checkout-email" placeholder="you@example.com"/>
                  {errors.email && <span className="field-error" data-testid="error-checkout-email">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input value={shipping.phone} onChange={e => setS("phone", e.target.value)}
                    data-testid="input-phone" placeholder="+1 (555) 000-0000"/>
                </div>
              </div>
              <div className="form-group">
                <label>Street Address</label>
                <input value={shipping.address} onChange={e => setS("address", e.target.value)}
                  className={errors.address ? "input-error" : ""} data-testid="input-address" placeholder="123 Main St"/>
                {errors.address && <span className="field-error" data-testid="error-address">{errors.address}</span>}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input value={shipping.city} onChange={e => setS("city", e.target.value)}
                    className={errors.city ? "input-error" : ""} data-testid="input-city" placeholder="New York"/>
                  {errors.city && <span className="field-error" data-testid="error-city">{errors.city}</span>}
                </div>
                <div className="form-group">
                  <label>ZIP Code</label>
                  <input value={shipping.zip} onChange={e => setS("zip", e.target.value)}
                    className={errors.zip ? "input-error" : ""} data-testid="input-zip" placeholder="10001"/>
                  {errors.zip && <span className="field-error" data-testid="error-zip">{errors.zip}</span>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: Payment */}
          {step === 1 && (
            <div className="checkout-section" data-testid="payment-form">
              <h2>Payment Details</h2>
              <div className="card-icons" data-testid="card-icons">
                <span>💳 Visa</span><span>💳 Mastercard</span><span>💳 Amex</span>
              </div>
              <div className="form-group">
                <label>Name on Card</label>
                <input value={payment.cardName} onChange={e => setP("cardName", e.target.value)}
                  className={errors.cardName ? "input-error" : ""} data-testid="input-card-name" placeholder="John Doe"/>
                {errors.cardName && <span className="field-error" data-testid="error-card-name">{errors.cardName}</span>}
              </div>
              <div className="form-group">
                <label>Card Number</label>
                <input value={payment.cardNumber} onChange={e => setP("cardNumber", fmtCard(e.target.value))}
                  className={errors.cardNumber ? "input-error" : ""} data-testid="input-card-number"
                  placeholder="1234 5678 9012 3456" maxLength="19"/>
                {errors.cardNumber && <span className="field-error" data-testid="error-card-number">{errors.cardNumber}</span>}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input value={payment.expiry} onChange={e => setP("expiry", fmtExp(e.target.value))}
                    className={errors.expiry ? "input-error" : ""} data-testid="input-expiry"
                    placeholder="MM/YY" maxLength="5"/>
                  {errors.expiry && <span className="field-error" data-testid="error-expiry">{errors.expiry}</span>}
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input value={payment.cvv} onChange={e => setP("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                    className={errors.cvv ? "input-error" : ""} data-testid="input-cvv"
                    placeholder="123" maxLength="4"/>
                  {errors.cvv && <span className="field-error" data-testid="error-cvv">{errors.cvv}</span>}
                </div>
              </div>
              <p className="secure-note">🔒 Your payment info is encrypted and secure.</p>
            </div>
          )}

          {/* STEP 2: Review */}
          {step === 2 && (
            <div className="checkout-section" data-testid="review-section">
              <h2>Review Your Order</h2>
              <div className="review-items" data-testid="review-items">
                {cart.map(item => (
                  <div className="review-item" key={item.id} data-testid={`review-item-${item.id}`}>
                    <span className="review-item-img">💻</span>
                    <div className="review-item-info">
                      <div className="review-item-name">{item.name}</div>
                      <div className="review-item-qty">Qty: {item.qty}</div>
                    </div>
                    <div className="review-item-price">${(item.price * item.qty).toLocaleString()}</div>
                  </div>
                ))}
              </div>
              <div className="review-ship" data-testid="review-shipping-addr">
                <strong>Shipping to:</strong> {shipping.firstName} {shipping.lastName}, {shipping.address}, {shipping.city} {shipping.zip}
              </div>
              <div className="review-pay" data-testid="review-payment">
                <strong>Paying with:</strong> Card ending in {payment.cardNumber.slice(-4)}
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="checkout-nav" data-testid="checkout-nav">
            {step > 0 && (
              <button className="btn-ghost" onClick={() => setStep(s => s - 1)} data-testid="btn-back">← Back</button>
            )}
            {step < 2 ? (
              <button className="btn-primary" onClick={handleNext} data-testid="btn-next">
                Continue →
              </button>
            ) : (
              <button className="btn-primary place-order-btn" onClick={handlePlaceOrder} data-testid="btn-place-order">
                Place Order · ${total.toFixed(2)}
              </button>
            )}
          </div>
        </div>

        {/* Summary sidebar */}
        <div className="checkout-summary" data-testid="checkout-summary">
          <h3>Order Summary</h3>
          {cart.map(item => (
            <div className="summary-item" key={item.id}>
              <span>{item.name} ×{item.qty}</span>
              <span>${(item.price * item.qty).toLocaleString()}</span>
            </div>
          ))}
          <div className="summary-divider" />
          <div className="summary-row"><span>Subtotal</span><span>${cartTotal.toLocaleString()}</span></div>
          <div className="summary-row"><span>Shipping</span><span>{shippingFee === 0 ? "FREE" : `$${shippingFee}`}</span></div>
          <div className="summary-row"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
          <div className="summary-divider" />
          <div className="summary-row total-row"><span>Total</span><span data-testid="checkout-total">${total.toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
}
