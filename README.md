# 💼 MERN E-Commerce Platform — Frontend

A scalable, performant, and modern e-commerce frontend built with **React.js**, **TypeScript**, **Redux Toolkit**, and **Vite**, integrated with **Firebase**, **Stripe**, **Cloudinary**, and **Docker**.

---

## ✨ Key Features

### 👤 User Experience

* 🔐 **Firebase Authentication** — Sign in with Google or email/password.
* 🔍 **Smart Filtering** — Browse products by category, price, and rating.
* ⭐ **Ratings & Reviews** — Share feedback to help others.
* 💳 **Stripe Checkout** — Seamless and secure payment process.
* 🎟️ **Coupons & Discounts** — Apply promo codes at checkout.

### 💠 Admin Dashboard

* 📦 **Product Management** — Add, update, delete products.
* 📈 **Sales Analytics** — View real-time performance stats.
* 📋 **Order Management** — Track and update order statuses.
* 👥 **User Control** — Manage customers and admin access.
* 🎫 **Coupon System** — Create and manage discount codes.

---

## 🧰 Tech Stack

| Layer      | Technologies               |
| ---------- | -------------------------- |
| Frontend   | React.js, TypeScript, Vite |
| State Mgmt | Redux Toolkit              |
| Auth       | Firebase Authentication    |
| Payments   | Stripe                     |
| Images     | Cloudinary                 |
| DevOps     | Docker, Vercel             |

---

## 📁 Folder Structure

```
src/
├── assets/               # Static data (e.g., JSON)
├── components/           # UI components (user + admin)
│   └── admin/            # Admin-specific UI components
├── pages/                # Route pages (e.g., cart, login, dashboard)
│   └── admin/            # Admin dashboard and tools
├── redux/                # API slices and reducers
│   └── api/              # API integrations
├── styles/               # SCSS files and admin styles
├── types/                # TypeScript definitions
├── utils/                # Helper utilities
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/danishali22/mern-ecommerence-frontend.git
cd mern-ecommerence-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy `.env.sample` to `.env` and add your credentials:

```env
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
VITE_API_URL=http://localhost:5000
```

### 4. Start Development Server

```bash
npm run dev
```

---

## 🔧 Scripts

```bash
npm run dev       # Start local dev server
npm run build     # Build production app
npm run preview   # Preview production build
```

---

## 📊 Learnings

* Integrated **Firebase** for secure social/email login.
* Built scalable global state with **Redux Toolkit**.
* Implemented Stripe payments with token handling.
* Optimized performance with **Cloudinary** and **Docker**.
* Developed modular SCSS-based admin panel.

---

## 🔗 Related

* Backend: [mern-ecommerence-backend](https://github.com/danishali22/mern-ecommerence-backend)

---

## ✉️ Contact

> Built with ❤️ by [@danishali22](https://github.com/danishali22)
