import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import CartPage from "./components/CartPage";
import "./index.css";
import { Toaster, toast } from "react-hot-toast"; // Import react-hot-toast

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingCartItem = prevCart.find((item) => item.id === product.id);
      if (existingCartItem) {
        if (existingCartItem.quantity + 1 > product.quantity) {
          toast.error(
            `Sorry, only ${product.quantity} item(s) available for ${product.name}.`
          ); // Use toast instead of alert
          return prevCart;
        }

        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success(`${product.name} added to cart!`); // Toast for item added
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  return (
    <Router>
      <Toaster
        position={"top-center"}
        reverseOrder={false}
        toastOptions={{
          style: {
            boxSizing: "border-box",
            boxShadow: "0px 16px 28px rgba(0, 0, 0, 0.3)",
          },
        }}
      />
      <div>
        <nav className="flex justify-between p-4 bg-white shadow">
          <h1 className="text-xl font-bold">TeeRex Store</h1>
          <div>
            <Link to="/" className="mr-4">
              Products
            </Link>
            <Link to="/cart" className="relative">
              Cart
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </nav>
        <div className="container mx-auto p-4">
          <Routes>
            <Route
              path="/"
              element={
                <ProductList
                  addToCart={addToCart}
                  products={products}
                  setProducts={setProducts}
                />
              }
            />
            <Route
              path="/cart"
              element={<CartPage cart={cart} setCart={setCart} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
