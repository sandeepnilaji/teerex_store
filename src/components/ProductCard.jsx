import React from "react";

function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white border rounded-lg shadow p-4">
      <img
        src={product.imageURL}
        alt={product.name}
        className="w-[300px] h-[150px] object-cover mb-2 bore"
        onError={(e) => (e.target.src = "placeholder-image-url.jpg")}
      />
      <h2 className="text-lg font-semibold text-cyan-700">{product.name}</h2>
      <h2 className="text-lg font-semibold text-cyan-700">
        Qty: {product.quantity}
      </h2>
      <p className="text-gray-700">Rs {product.price}</p>
      <button
        onClick={() => addToCart(product)}
        disabled={product.quantity === 0}
        className={`mt-2 w-full py-2 text-white rounded ${
          product.quantity === 0
            ? "bg-gray-400"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
