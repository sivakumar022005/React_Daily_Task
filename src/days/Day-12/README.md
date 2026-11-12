# React E-commerce Application 🛒

A responsive E-commerce Shopping Application built using React.js, JavaScript, and Tailwind CSS. This project demonstrates API Integration, State Management, Shopping Cart Functionality, Search, Filtering, Sorting, and Dynamic Calculations.

## 🚀 Features

- Fetch products from Fake Store API.
- Display products with images and prices.
- Display product ratings and categories.
- Search products by name.
- Filter products by category.
- Sort products by price (Low to High).
- Sort products by price (High to Low).
- Sort products by highest rating.
- Add products to the shopping cart.
- Increase product quantity.
- Decrease product quantity.
- Remove products from the cart.
- Calculate total cart items.
- Calculate total cart price.
- Display an empty cart message.
- Display loading animation while fetching products.
- Handle API errors.
- Retry API requests.
- Responsive UI for mobile and desktop devices.

## 🛠️ Technologies Used

- React.js
- JavaScript (ES6+)
- Tailwind CSS v4
- Fake Store API
- HTML5
- JS
- Fetch API

## 📚 React Concepts Practiced

| Concept               | Usage                                              |
| --------------------- | -------------------------------------------------- |
| `useState()`          | Manage products, search, filters, and cart data    |
| `useEffect()`         | Fetch products when the application loads          |
| `useMemo()`           | Optimize filtered and sorted product calculations  |
| `fetch()`             | Retrieve product data from the API                 |
| `async/await`         | Handle asynchronous API requests                   |
| `try/catch/finally`   | Handle API errors and loading states               |
| `map()`               | Display products and cart items dynamically        |
| `filter()`            | Filter products and remove cart items              |
| `find()`              | Check whether a product already exists in the cart |
| `reduce()`            | Calculate total items and total price              |
| Spread Operator       | Update cart data without directly modifying state  |
| Conditional Rendering | Display loading, error, empty, and cart states     |
| Event Handling        | Handle search, filters, sorting, and cart actions  |
| Controlled Inputs     | Manage search and filter values                    |
| `Intl.NumberFormat()` | Format product prices as currency                  |
| State Management      | Manage shopping cart and product information       |

## 🛍️ E-commerce Application Functionality

### 1. Fetch Products from API

Uses the Fake Store API to retrieve product information.

**API Endpoint:**

```text
https://fakestoreapi.com/products
```

### 2. Display Products

Displays product images, titles, prices, categories, and ratings using React's `map()` method.

### 3. Search Products

Allows users to search for products by name using `filter()` and `includes()`.

### 4. Filter Products

Allows users to filter products based on their categories.

### 5. Sort Products

Provides sorting options:

- Price: Low to High
- Price: High to Low
- Highest Rating

### 6. Add to Cart

Allows users to add products to their shopping cart. If the product already exists, its quantity increases automatically.

### 7. Update Cart Quantity

Allows users to increase or decrease the quantity of products.

### 8. Remove from Cart

Removes selected products from the shopping cart using `filter()`.

### 9. Calculate Total Items

Calculates the total number of products in the cart.

```javascript
const totalItems = cart.reduce(
  (total, item) => total + item.quantity,
  0
);
```

### 10. Calculate Total Price

Calculates the total shopping cart price based on product prices and quantities.

```javascript
const totalPrice = cart.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);
```

**Formula:**

```text
Total Price = Sum of (Product Price × Quantity)
```

### 11. Checkout

Displays a demo checkout action. A real payment gateway is not connected.

## 🔄 API Integration

This project uses the Fake Store API to retrieve product information.

The `useEffect()` hook calls the API when the application loads.

The `fetchProducts()` function uses:

- `fetch()` to request product data.
- `response.json()` to convert the response into JSON.
- `try/catch` to handle errors.
- `finally` to stop the loading state.

## 🛒 State Management

This project uses React's `useState()` hook to manage application data.

The following states are used:

- `products` – Stores products fetched from the API.
- `loading` – Tracks the API loading status.
- `error` – Stores API error messages.
- `search` – Stores the search input.
- `category` – Stores the selected product category.
- `sort` – Stores the selected sorting option.
- `cart` – Stores shopping cart products and quantities.
- `showCart` – Controls the visibility of the shopping cart panel.

## ⚙️ Installation and Setup

### 1. Create a React Vite project

```bash
npm create vite@latest ecommerce-app -- --template react
```

### 2. Navigate to the project folder

```bash
cd ecommerce-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Install Tailwind CSS v4

```bash
npm install tailwindcss @tailwindcss/vite
```

### 5. Configure `vite.config.js`

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### 6. Update `src/index.css`

```css
@import "tailwindcss";
```

### 7. Add the application code

Copy the complete React application code into:

```text
src/App.js
```

Make sure `src/main.jsx` imports `./index.css` and `./App.jsx`.

### 8. Start the development server

```bash
npm start
```

Open the local URL displayed in your terminal to view the application.

## 🎯 Learning Objectives

- Understand API Integration in React.
- Learn how to fetch data from external APIs.
- Understand `useEffect()` and `useState()`.
- Handle loading and error states.
- Understand asynchronous JavaScript.
- Practice JavaScript array methods.
- Implement product search and filtering.
- Implement product sorting.
- Understand shopping cart management.
- Update cart quantities dynamically.
- Calculate totals using `reduce()`.
- Understand immutable state updates.
- Build a complete frontend shopping application.
- Create responsive UI using Tailwind CSS.

## 🔮 Future Improvements

- Add user registration and login.
- Add product details pages.
- Add product reviews.
- Add a wishlist feature.
- Add a persistent shopping cart using `localStorage`.
- Add product pagination.
- Add price range filtering.
- Add shipping address management.
- Add order history.
- Add backend integration.
- Add a database.
- Integrate a secure payment gateway.
- Add an admin dashboard.
- Add dark and light mode.
- Add order confirmation emails.

## 👨‍💻 Project Summary

This project combines important React concepts learned throughout the daily projects into one E-commerce application.

It provides practical experience with API integration, React hooks, state management, JavaScript array methods, shopping cart functionality, and responsive design.

**Note:** This is a frontend demonstration project. It uses sample API data and does not process real payments or create actual orders.
