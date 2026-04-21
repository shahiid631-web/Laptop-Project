import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products, PRICE_RANGE } from "../data/products";
import ProductCard from "../components/ProductCard";
import FilterPanel from "../components/FilterPanel";

const DEFAULT_FILTERS = {
  brands: [], ram: [], storage: [], processors: [],
  priceMin: PRICE_RANGE.min, priceMax: PRICE_RANGE.max
};

export default function Home() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState("grid");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filtered = useMemo(() => {
    let list = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.processorDetail.toLowerCase().includes(q)
      );
    }

    if (filters.brands.length) list = list.filter(p => filters.brands.includes(p.brand));
    if (filters.ram.length) list = list.filter(p => filters.ram.includes(p.ram));
    if (filters.storage.length) list = list.filter(p => filters.storage.includes(p.storage));
    if (filters.processors.length) list = list.filter(p => filters.processors.includes(p.processor));
    list = list.filter(p => p.price >= filters.priceMin && p.price <= filters.priceMax);

    switch (sort) {
      case "price-asc": return list.sort((a, b) => a.price - b.price);
      case "price-desc": return list.sort((a, b) => b.price - a.price);
      case "rating": return list.sort((a, b) => b.rating - a.rating);
      case "reviews": return list.sort((a, b) => b.reviews - a.reviews);
      default: return list;
    }
  }, [filters, sort, searchQuery]);

  return (
    <div className="home-page">
      {/* Hero */}
      {!searchQuery && (
        <section className="hero" data-testid="hero">
          <div className="hero-content">
            <div className="hero-tag">Premium Laptop Store</div>
            <h1 className="hero-title">Find Your<br /><em>Perfect</em> Machine</h1>
            <p className="hero-sub">20+ laptops from Apple, Dell, Lenovo, HP & Asus — filtered to your needs.</p>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">20+</span><span className="stat-label">Laptops</span></div>
            <div className="stat"><span className="stat-num">5</span><span className="stat-label">Brands</span></div>
            <div className="stat"><span className="stat-num">Free</span><span className="stat-label">Shipping</span></div>
          </div>
        </section>
      )}

      {searchQuery && (
        <div className="search-header" data-testid="search-header">
          <h2>Results for "<strong>{searchQuery}</strong>"</h2>
        </div>
      )}

      <div className="shop-layout">
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(DEFAULT_FILTERS)}
          resultCount={filtered.length}
        />

        <main className="product-area">
          <div className="toolbar" data-testid="toolbar">
            <span className="result-label" data-testid="toolbar-count">
              {filtered.length} laptop{filtered.length !== 1 ? "s" : ""}
            </span>
            <div className="toolbar-right">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="sort-select"
                data-testid="sort-select"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
              <div className="view-toggle" data-testid="view-toggle">
                <button
                  className={`view-btn ${view === "grid" ? "active" : ""}`}
                  onClick={() => setView("grid")}
                  data-testid="view-grid"
                >⊞</button>
                <button
                  className={`view-btn ${view === "list" ? "active" : ""}`}
                  onClick={() => setView("list")}
                  data-testid="view-list"
                >☰</button>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state" data-testid="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No laptops found</h3>
              <p>Try adjusting your filters or search term.</p>
              <button onClick={() => setFilters(DEFAULT_FILTERS)} className="btn-primary">Clear Filters</button>
            </div>
          ) : (
            <div className={`product-grid ${view === "list" ? "list-view" : ""}`} data-testid="product-grid">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
