# DanishAli22 MERN E-Commerce Frontend

Welcome to the **DanishAli22 MERN E-Commerce Frontend**! This is the frontend of an e-commerce platform built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and **TypeScript**. It provides a user-friendly interface for browsing products, managing orders, and making payments.

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Directory Structure](#directory-structure)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This is the frontend for the DanishAli22 MERN E-Commerce platform. It allows users to:
- Browse products with advanced filtering and sorting options.
- View product details and images.
- Add products to the cart and manage the cart.
- Checkout and make secure payments using **Stripe**.
- Register or log in using **Google authentication via Firebase**.

The frontend is designed to be responsive and provides a smooth, mobile-friendly experience for users.

---

## Tech Stack

- **React.js** – Library for building the user interface.
- **TypeScript** – Ensures type safety and better maintainability.
- **Redux** – State management for global application state.
- **React Router** – For routing and navigating between different pages.
- **Axios** – For making HTTP requests to the backend API.
- **Stripe** – Payment gateway integration.
- **Firebase** – Authentication service for Google login.
- **Tailwind CSS** – For styling the frontend components.
- **React Query** – For fetching and managing data from the backend.

---

## Installation

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version >= 14)
- **npm** or **yarn** (for package management)

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/danishali22-mern-ecommerce-frontend.git
    cd danishali22-mern-ecommerce-frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

    or if you're using Yarn:

    ```bash
    yarn install
    ```

3. Copy the sample environment file and configure your environment variables:

    ```bash
    cp .env.sample .env
    ```

    Update the `.env` file with the following variables:
    - **REACT_APP_API_URL** – Backend API URL
    - **REACT_APP_FIREBASE_API_KEY** – Firebase API key for authentication
    - **REACT_APP_STRIPE_PUBLIC_KEY** – Stripe public key for payments

4. Run the development server:

    ```bash
    npm start
    ```

    or if you're using Yarn:

    ```bash
    yarn start
    ```

    This will start the development server and open the frontend in your browser.

---

## Directory Structure

```plaintext
└── danishali22-mern-ecommerce-frontend/
    ├── public/
    │   ├── index.html               # Main HTML file
    │   └── favicon.ico              # Application favicon
    ├── src/
    │   ├── assets/                  # Static assets like images, icons, etc.
    │   ├── components/              # Reusable components (Button, Navbar, etc.)
    │   ├── context/                 # Global state management (e.g., Cart, User)
    │   ├── pages/                   # React components for different pages (Home, Product, Cart, etc.)
    │   ├── redux/                   # Redux state management files
    │   ├── services/                # API calls and other services (Axios, Stripe, etc.)
    │   ├── styles/                  # Global styles (Tailwind CSS configuration)
    │   ├── utils/                   # Utility functions (e.g., formatting)
    │   ├── App.tsx                  # Root component for routing
    │   ├── index.tsx                # Main entry point for React
    ├── .env.sample                  # Sample environment variables
    ├── package.json                 # Project dependencies and scripts
    ├── tailwind.config.js           # Tailwind CSS configuration
    └── tsconfig.json                # TypeScript configuration
