import React from "react";
import { toast } from "react-hot-toast";

function CartPage({ cart, setCart }) {
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, newQuantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleDelete = (id) => {
    toast.success("Item removed from cart!");
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center mb-4 border-b pb-4">
              <img
                src={item.imageURL}
                alt={item.name}
                className="w-20 h-20 object-cover mr-4"
                onError={(e) => (e.target.src = "placeholder-image-url.jpg")}
              />
              <div className="flex-grow">
                <h3 className="text-lg">{item.name}</h3>
                <p>Rs {item.price}</p>
                <div className="flex items-center mt-2">
                  <label className="mr-2">Qty:</label>
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    className="border rounded p-1"
                  >
                    {[...Array(item.quantity + 1).keys()].map((qty) => (
                      <option key={qty} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="ml-4 bg-red-500 text-white rounded px-2 py-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          <hr className="my-4" />
          <h3 className="text-lg font-bold">Total amount: Rs {totalAmount}</h3>
        </div>
      )}
    </div>
  );
}

export default CartPage;
