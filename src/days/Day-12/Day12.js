
import { useEffect, useMemo, useState } from "react";

const API_URL = "https://fakestoreapi.com/products";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

function Day12() {
  // Product states
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search, filter and sorting states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  // Shopping cart states
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Get unique categories
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Search, filter and sort products
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    return result;
  }, [products, search, category, sort]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  };

  // Cart calculations
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Demo checkout
  const handleCheckout = () => {
    alert("Demo checkout! Payment gateway is not connected.");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">

      {/* Navbar */}
      <nav className="sticky top-0 z-20 bg-slate-950 px-5 py-4 text-white shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <h1 className="text-2xl font-extrabold tracking-wide text-cyan-400">
            ShopZone
          </h1>

          <button
            onClick={() => setShowCart(!showCart)}
            className="relative rounded-xl bg-cyan-500 px-5 py-2 font-bold text-slate-950 transition hover:bg-cyan-400"
          >
            🛒 Cart
            <span className="ml-2 rounded-full bg-slate-950 px-2 py-1 text-xs text-white">
              {totalItems}
            </span>
          </button>
        </div>
      </nav>

      {/* Hero section */}
      <section className="bg-gradient-to-r from-slate-950 to-cyan-900 px-5 py-12 text-center text-white">
        <h2 className="mb-3 text-3xl font-extrabold sm:text-5xl">
          Discover Your Favorite Products
        </h2>
        <p className="text-slate-300">
          Shop smart. Shop easy. Shop with ShopZone.
        </p>
      </section>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-5 py-10">

        {/* Search and filters */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-cyan-500 md:col-span-1"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-cyan-500"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-cyan-500"
          >
            <option value="default">Sort By: Default</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>

        {/* Product heading */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Our Products</h2>
          <p className="text-sm text-slate-500">
            {filteredProducts.length} products found
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent"></div>
            <p className="font-semibold text-slate-600">
              Loading products...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl bg-red-100 p-6 text-center text-red-700">
            <p className="mb-3 font-semibold">{error}</p>
            <button
              onClick={fetchProducts}
              className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Product grid */}
        {!loading && !error && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="rounded-xl bg-white p-10 text-center text-slate-500">
                No products found.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex h-56 items-center justify-center bg-white p-6">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-5">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-600">
                        {product.category}
                      </p>

                      <h3 className="mb-2 line-clamp-2 min-h-12 font-bold">
                        {product.title}
                      </h3>

                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-xl font-extrabold text-slate-900">
                          {formatPrice(product.price)}
                        </span>

                        <span className="text-sm font-semibold text-amber-500">
                          ⭐ {product.rating.rate}
                        </span>
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded-xl bg-slate-950 py-3 font-bold text-white transition hover:bg-cyan-600"
                      >
                        Add to Cart +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Shopping cart panel */}
      {showCart && (
        <div className="fixed inset-0 z-30 flex justify-end bg-black/50">
          <div className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl">

            {/* Cart header */}
            <div className="flex items-center justify-between bg-slate-950 p-5 text-white">
              <h2 className="text-xl font-bold">
                🛒 Shopping Cart ({totalItems})
              </h2>

              <button
                onClick={() => setShowCart(false)}
                className="text-2xl hover:text-cyan-400"
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            {/* Cart items */}
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="mb-3 text-5xl">🛍️</p>
                  <p className="font-semibold text-slate-500">
                    Your cart is empty!
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-xl border border-slate-200 p-3"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 object-contain"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-sm font-bold">
                        {item.title}
                      </h3>

                      <p className="mt-1 font-bold text-cyan-700">
                        {formatPrice(item.price * item.quantity)}
                      </p>

                      <div className="mt-2 flex items-center gap-3">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="h-7 w-7 rounded bg-slate-200 font-bold hover:bg-slate-300"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>

                        <span className="font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="h-7 w-7 rounded bg-slate-200 font-bold hover:bg-slate-300"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-sm font-semibold text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart footer */}
            <div className="border-t border-slate-200 p-5">
              <div className="mb-4 flex justify-between text-lg font-bold">
                <span>Total Price</span>
                <span className="text-cyan-700">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="w-full rounded-xl bg-cyan-600 py-3 font-bold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => setShowCart(false)}
                className="mt-3 w-full rounded-xl border border-slate-300 py-3 font-semibold hover:bg-slate-100"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 px-5 py-6 text-center text-sm text-slate-400">
        © 2026 ShopZone. Built with React and Tailwind CSS.
      </footer>
    </div>
  );
}

export default Day12;
