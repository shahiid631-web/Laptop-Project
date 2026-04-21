import { BRANDS, RAM_OPTIONS, STORAGE_OPTIONS, PROCESSOR_OPTIONS, PRICE_RANGE } from "../data/products";

export default function FilterPanel({ filters, onChange, onReset, resultCount }) {
  const toggle = (key, value) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  const hasActiveFilters =
    filters.brands.length > 0 || filters.ram.length > 0 ||
    filters.storage.length > 0 || filters.processors.length > 0 ||
    filters.priceMin > PRICE_RANGE.min || filters.priceMax < PRICE_RANGE.max;

  return (
    <aside className="filter-panel" data-testid="filter-panel">
      <div className="filter-header">
        <h2 className="filter-title">Filters</h2>
        {hasActiveFilters && (
          <button className="filter-reset" onClick={onReset} data-testid="filter-reset">
            Clear all
          </button>
        )}
      </div>
      <p className="filter-count" data-testid="result-count">{resultCount} results</p>

      {/* Brand */}
      <div className="filter-section" data-testid="filter-brand">
        <h3 className="filter-section-title">Brand</h3>
        {BRANDS.map(brand => (
          <label key={brand} className="filter-checkbox" data-testid={`filter-brand-${brand.toLowerCase()}`}>
            <input
              type="checkbox"
              checked={filters.brands.includes(brand)}
              onChange={() => toggle("brands", brand)}
            />
            <span className="checkmark" />
            <span>{brand}</span>
          </label>
        ))}
      </div>

      {/* Price */}
      <div className="filter-section" data-testid="filter-price">
        <h3 className="filter-section-title">Price Range</h3>
        <div className="price-range-display">
          <span data-testid="price-min-display">${filters.priceMin.toLocaleString()}</span>
          <span>–</span>
          <span data-testid="price-max-display">${filters.priceMax.toLocaleString()}</span>
        </div>
        <div className="range-wrap">
          <label className="range-label">Min</label>
          <input
            type="range"
            min={PRICE_RANGE.min}
            max={PRICE_RANGE.max}
            step={50}
            value={filters.priceMin}
            onChange={e => onChange({ ...filters, priceMin: Math.min(+e.target.value, filters.priceMax - 50) })}
            className="range-input"
            data-testid="price-min-slider"
          />
        </div>
        <div className="range-wrap">
          <label className="range-label">Max</label>
          <input
            type="range"
            min={PRICE_RANGE.min}
            max={PRICE_RANGE.max}
            step={50}
            value={filters.priceMax}
            onChange={e => onChange({ ...filters, priceMax: Math.max(+e.target.value, filters.priceMin + 50) })}
            className="range-input"
            data-testid="price-max-slider"
          />
        </div>
      </div>

      {/* RAM */}
      <div className="filter-section" data-testid="filter-ram">
        <h3 className="filter-section-title">RAM</h3>
        {RAM_OPTIONS.map(r => (
          <label key={r} className="filter-checkbox" data-testid={`filter-ram-${r}`}>
            <input
              type="checkbox"
              checked={filters.ram.includes(r)}
              onChange={() => toggle("ram", r)}
            />
            <span className="checkmark" />
            <span>{r}</span>
          </label>
        ))}
      </div>

      {/* Storage */}
      <div className="filter-section" data-testid="filter-storage">
        <h3 className="filter-section-title">Storage</h3>
        {STORAGE_OPTIONS.map(s => (
          <label key={s} className="filter-checkbox" data-testid={`filter-storage-${s}`}>
            <input
              type="checkbox"
              checked={filters.storage.includes(s)}
              onChange={() => toggle("storage", s)}
            />
            <span className="checkmark" />
            <span>{s}</span>
          </label>
        ))}
      </div>

      {/* Processor */}
      <div className="filter-section" data-testid="filter-processor">
        <h3 className="filter-section-title">Processor</h3>
        {PROCESSOR_OPTIONS.map(p => (
          <label key={p} className="filter-checkbox" data-testid={`filter-processor-${p.replace(" ", "-").toLowerCase()}`}>
            <input
              type="checkbox"
              checked={filters.processors.includes(p)}
              onChange={() => toggle("processors", p)}
            />
            <span className="checkmark" />
            <span>{p}</span>
          </label>
        ))}
      </div>
    </aside>
  );
}
