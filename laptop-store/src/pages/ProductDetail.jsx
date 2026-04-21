import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { products } from "../data/products";
import { useApp } from "../context/AppContext";

const brandColors = { Apple: "#555", Dell: "#0076CE", Lenovo: "#E2231A", HP: "#0096D6", Asus: "#00539B" };

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart, wishlist, toggleWishlist } = useApp();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find(p => p.id === parseInt(id));
  if (!product) return (
    <div className="not-found" data-testid="not-found">
      <h2>Product not found</h2>
      <Link to="/" className="btn-primary">Back to Shop</Link>
    </div>
  );

  const inCart = cart.find(i => i.id === product.id);
  const isWished = wishlist.includes(product.id);
  const related = products.filter(p => p.brand === product.brand && p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-detail-page" data-testid="product-detail">
      <nav className="breadcrumb" data-testid="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span style={{ color: brandColors[product.brand] }}>{product.brand}</span>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      <div className="detail-grid">
        {/* Image */}
        <div className="detail-img-wrap" data-testid="product-image">
          <div className="detail-img-placeholder" style={{ background: `${brandColors[product.brand]}10` }}>
            {product.badge && <span className="product-badge">{product.badge}</span>}
            <div className="brand-logo-big" style={{ color: brandColors[product.brand] }}>{product.brand}</div>
            <div className="laptop-icon-big">💻</div>
            <div className="product-name-big">{product.name}</div>
          </div>
        </div>

        {/* Info */}
        <div className="detail-info">
          <div className="detail-brand" style={{ color: brandColors[product.brand] }}
            data-testid="detail-brand">{product.brand}</div>
          <h1 className="detail-name" data-testid="detail-name">{product.name}</h1>

          <div className="detail-rating" data-testid="detail-rating">
            <span className="stars">{"★".repeat(Math.floor(product.rating))}{"☆".repeat(5 - Math.floor(product.rating))}</span>
            <span className="rating-num">{product.rating}</span>
            <span className="reviews">({product.reviews.toLocaleString()} reviews)</span>
          </div>

          <div className="detail-price" data-testid="detail-price">
            ${product.price.toLocaleString()}
          </div>

          <p className="detail-description" data-testid="detail-description">{product.description}</p>

          {/* Specs */}
          <div className="specs-grid" data-testid="specs-grid">
            <div className="spec-item"><span className="spec-label">Processor</span><span className="spec-val" data-testid="spec-processor">{product.processorDetail}</span></div>
            <div className="spec-item"><span className="spec-label">RAM</span><span className="spec-val" data-testid="spec-ram">{product.ram}</span></div>
            <div className="spec-item"><span className="spec-label">Storage</span><span className="spec-val" data-testid="spec-storage">{product.storage}</span></div>
            <div className="spec-item"><span className="spec-label">Display</span><span className="spec-val">{product.specs.display}</span></div>
            <div className="spec-item"><span className="spec-label">Battery</span><span className="spec-val">{product.specs.battery}</span></div>
            <div className="spec-item"><span className="spec-label">Weight</span><span className="spec-val">{product.specs.weight}</span></div>
            <div className="spec-item"><span className="spec-label">GPU</span><span className="spec-val">{product.specs.gpu}</span></div>
          </div>

          {/* Actions */}
          <div className="detail-actions">
            <div className="qty-control" data-testid="qty-control">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} data-testid="qty-dec">−</button>
              <span data-testid="qty-value">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} data-testid="qty-inc">+</button>
            </div>

            <button
              className={`btn-primary add-btn ${added ? "added" : ""}`}
              onClick={handleAddToCart}
              data-testid="detail-add-to-cart"
            >
              {added ? "✓ Added!" : inCart ? "Add More" : "Add to Cart"}
            </button>

            <button
              className={`btn-wishlist ${isWished ? "wished" : ""}`}
              onClick={() => toggleWishlist(product.id)}
              data-testid="detail-wishlist"
            >
              {isWished ? "♥" : "♡"}
            </button>
          </div>

          {inCart && (
            <div className="in-cart-note" data-testid="in-cart-note">
              Already in cart ({inCart.qty} item{inCart.qty > 1 ? "s" : ""}) —{" "}
              <Link to="/cart">View Cart</Link>
            </div>
          )}

          <div className="detail-perks">
            <span>🚚 Free shipping</span>
            <span>↩ 30-day returns</span>
            <span>🛡 2-year warranty</span>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="related-section" data-testid="related-products">
          <h2 className="section-title">More from {product.brand}</h2>
          <div className="related-grid">
            {related.map(p => (
              <Link to={`/product/${p.id}`} key={p.id} className="related-card" data-testid={`related-${p.id}`}>
                <div className="related-img" style={{ background: `${brandColors[p.brand]}10` }}>💻</div>
                <div className="related-info">
                  <div className="related-name">{p.name}</div>
                  <div className="related-price">${p.price.toLocaleString()}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
