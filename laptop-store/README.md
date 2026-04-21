# ⬡ TechDesk — Laptop E-Commerce Store

![Cypress Tests](https://github.com/YOUR_USERNAME/techdesk-laptop-store/actions/workflows/cypress.yml/badge.svg)
![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
![Cypress](https://img.shields.io/badge/Cypress-13.6-green?logo=cypress)
![Vite](https://img.shields.io/badge/Vite-5.1-purple?logo=vite)
![License](https://img.shields.io/badge/License-MIT-yellow)

> A fully functional laptop e-commerce frontend built with React, paired with a complete Cypress E2E automation suite — showcasing real-world test automation skills.

---

## 🌐 Live Demo

**App:** [https://techdesk.vercel.app](https://techdesk.vercel.app) ← *(replace with your deployed URL)*

---

## 📋 Project Overview

TechDesk is a demo e-commerce store for purchasing laptops. It was built specifically as a **Cypress automation showcase** — every interactive feature has `data-testid` attributes, full E2E test coverage, Page Object Model structure, custom commands, and a GitHub Actions CI/CD pipeline.

### What's automated:
| Area | Tests |
|------|-------|
| Homepage & Navigation | 14 tests |
| Product Filters (brand, RAM, storage, price, processor, sort) | 22 tests |
| Search functionality | 10 tests |
| Product Detail page | 18 tests |
| Cart (add, remove, qty, totals) | 22 tests |
| Login & Register (validation, auth flow) | 20 tests |
| Full Checkout (3-step, validation, order success) | 20 tests |
| **Total** | **~126 tests** |

---

## 🛠️ Tech Stack

### Application
- **React 18** — UI framework
- **React Router v6** — Client-side routing
- **Vite** — Build tool & dev server
- **localStorage** — Cart, auth, wishlist persistence (no backend needed)

### Testing
- **Cypress 13** — E2E test runner
- **Page Object Model** — Maintainable test structure
- **Custom Commands** — Reusable test helpers
- **Fixtures** — Test data management
- **GitHub Actions** — CI/CD pipeline

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/techdesk-laptop-store.git
cd techdesk-laptop-store

# Install dependencies
npm install

# Start the dev server
npm run dev
```

App runs at **http://localhost:3000**

---

## 🧪 Running Cypress Tests

### Open Cypress Test Runner (interactive)
```bash
# Make sure the app is running first
npm run dev

# In a new terminal, open Cypress
npm run cy:open
```

### Run All Tests Headless
```bash
# Start app + run all tests
npm run dev &
npm run cy:run
```

### Run a Specific Spec File
```bash
npx cypress run --spec "cypress/e2e/02_filters.cy.js"
```

---

## 📁 Project Structure

```
techdesk-laptop-store/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation with search & cart
│   │   ├── ProductCard.jsx     # Product listing card
│   │   └── FilterPanel.jsx     # All filter controls
│   ├── pages/
│   │   ├── Home.jsx            # Product listing + filters
│   │   ├── ProductDetail.jsx   # Single product view
│   │   ├── Cart.jsx            # Shopping cart
│   │   ├── Login.jsx           # Login & Register
│   │   └── Checkout.jsx        # 3-step checkout
│   ├── context/
│   │   └── AppContext.jsx      # Global state (cart, auth, wishlist)
│   ├── data/
│   │   └── products.js         # 20 laptop products dataset
│   ├── App.jsx                 # Routes
│   ├── main.jsx                # Entry point
│   └── styles.css              # Full stylesheet
│
├── cypress/
│   ├── e2e/
│   │   ├── 01_homepage.cy.js       # Homepage & nav tests
│   │   ├── 02_filters.cy.js        # All filter tests
│   │   ├── 03_search.cy.js         # Search tests
│   │   ├── 04_product_detail.cy.js # Product detail tests
│   │   ├── 05_cart.cy.js           # Cart tests
│   │   ├── 06_auth.cy.js           # Auth tests
│   │   └── 07_checkout.cy.js       # Checkout flow tests
│   ├── support/
│   │   ├── pages/
│   │   │   ├── BasePage.js         # Shared selectors & navbar actions
│   │   │   ├── HomePage.js         # Home page POM
│   │   │   ├── ProductDetailPage.js
│   │   │   ├── CartPage.js
│   │   │   ├── LoginPage.js
│   │   │   └── CheckoutPage.js
│   │   ├── commands.js             # Custom Cypress commands
│   │   └── e2e.js                  # Support file
│   └── fixtures/
│       └── testData.json           # Test data (users, shipping, payment)
│
├── .github/
│   └── workflows/
│       └── cypress.yml             # GitHub Actions CI/CD
├── cypress.config.js
├── vite.config.js
├── vercel.json                     # Vercel deploy config
├── netlify.toml                    # Netlify deploy config
└── package.json
```

---

## 🔑 Custom Cypress Commands

```js
// Fast login via localStorage (no UI)
cy.loginByLocalStorage(name, email, password)

// Login via UI
cy.login(email, password)

// Register via UI
cy.register(name, email, password)

// Add product to cart
cy.addToCartById(productId)

// Fill shipping form
cy.fillShippingForm(shippingData)

// Fill payment form
cy.fillPaymentForm(paymentData)

// Assert cart badge count
cy.assertCartCount(n)

// Clear all localStorage state
cy.clearAppState()
```

---

## 🌍 Deployment

### Deploy to Vercel (recommended)
1. Push project to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Vercel auto-detects Vite — click **Deploy**
4. Done! `vercel.json` handles SPA routing

### Deploy to Netlify
1. Push project to GitHub
2. Go to [netlify.com](https://netlify.com) → Add new site → Import from Git
3. Build command: `npm run build`, Publish dir: `dist`
4. Click **Deploy** — `netlify.toml` handles routing

---

## ⚙️ CI/CD Pipeline

GitHub Actions runs all Cypress tests automatically on every push and pull request to `main`.

**Pipeline steps:**
1. Checkout code
2. Install Node.js 20
3. `npm ci` — install dependencies
4. `npm run build` — build the app
5. Start app with `npm run preview`
6. Run all Cypress specs in Chrome
7. Upload screenshots on failure
8. Upload videos always

To enable: push to GitHub, the workflow at `.github/workflows/cypress.yml` runs automatically.

---

## 🧩 Key Features Demonstrated

| Feature | Implementation |
|---------|---------------|
| Multi-filter product search | Brand, RAM, storage, processor, price range — all combinable |
| Cart state persistence | localStorage with real-time badge update |
| Form validation | Client-side with per-field error messages |
| Auth flow | Register → login → logout → session persistence |
| 3-step checkout | Shipping → Payment → Review → Order confirmation |
| Page Object Model | 5 page classes + BasePage |
| Custom commands | 8 reusable Cypress commands |
| data-testid coverage | Every interactive element has a testid |
| CI/CD | GitHub Actions with artifact upload |

---

## 📝 License

MIT — free to use for portfolio and learning purposes.
