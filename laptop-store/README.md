# ⬡ TechDesk — Laptop E-Commerce Store

> A fully functional laptop e-commerce frontend built with React, paired with a complete Cypress E2E automation suite — showcasing real-world test automation skills.

---

## 🌐 Live Demo

**App:** https://vocal-frangollo-cc155f.netlify.app/\

---

## 📋 Project Overview

TechDesk is a demo e-commerce store for purchasing laptops. It was built specifically as a **Cypress automation showcase** — every interactive feature has `data-testid` attributes, full E2E test coverage, Page Object Model structure, custom commands, and a GitHub Actions CI/CD pipeline.

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

## 🧩 Key Features Demonstrated

| Feature | Implementation |
|---------|---------------|
| Multi-filter product search | Brand, RAM, storage, processor, price range — all combinable |
| Cart state persistence | localStorage with real-time badge update |
| Form validation | Client-side with per-field error messages |
| Auth flow | Register → login → logout → session persistence |
| 3-step checkout | Shipping → Payment → Review → Order confirmation |

---

## 📝 License

MIT — free to use for portfolio and learning purposes.
