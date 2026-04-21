import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const brandColors = {
  Apple: "#555", Dell: "#0076CE", Lenovo: "#E2231A",
  HP: "#0096D6", Asus: "#00539B"
};

const brandInitials = {
  Apple: "🍎", Dell: "D", Lenovo: "L", HP: "HP", Asus: "A"
};

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useApp();
  const isWished = wishlist.includes(product.id);

  return (
    <div className="product-card" data-testid={`product-card-${product.id}`}>
      {product.badge && (
        <span className="product-badge" data-testid={`badge-${product.id}`}>{product.badge}</span>
      )}
      <button
        className={`wishlist-btn ${isWished ? "wished" : ""}`}
        onClick={() => toggleWishlist(product.id)}
        data-testid={`wishlist-btn-${product.id}`}
        aria-label="Toggle wishlist"
      >
        {isWished ? "♥" : "♡"}
      </button>

      <Link to={`/product/${product.id}`} className="product-img-wrap" data-testid={`product-link-${product.id}`}>
        <div className="product-img-placeholder" style={{ background: `${brandColors[product.brand]}15` }}>
          <div className="brand-logo-mock" style={{ color: brandColors[product.brand] }}>
            {brandInitials[product.brand]}
          </div>
          <div className="laptop-icon">💻</div>
          <div className="product-name-mock">{product.name}</div>
        </div>
      </Link>

      <div className="product-info">
        <div className="product-brand" data-testid={`product-brand-${product.id}`}
          style={{ color: brandColors[product.brand] }}>{product.brand}</div>
        <Link to={`/product/${product.id}`}>
          <h3 className="product-name" data-testid={`product-name-${product.id}`}>{product.name}</h3>
        </Link>

        <div className="product-tags" data-testid={`product-tags-${product.id}`}>
          <span className="tag">{product.processorDetail}</span>
          <span className="tag">{product.ram}</span>
          <span className="tag">{product.storage}</span>
        </div>

        <div className="product-rating" data-testid={`product-rating-${product.id}`}>
          <span className="stars">{"★".repeat(Math.floor(product.rating))}{"☆".repeat(5 - Math.floor(product.rating))}</span>
          <span className="rating-num">{product.rating}</span>
          <span className="reviews">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="product-footer">
          <span className="product-price" data-testid={`product-price-${product.id}`}>
            ${product.price.toLocaleString()}
          </span>
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
            data-testid={`add-to-cart-${product.id}`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
