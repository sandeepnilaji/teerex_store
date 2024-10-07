import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SearchBar from "./SearchBar";
import Filter from "./Filter";

function ProductList({ addToCart, setProducts, products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    gender: [],
    color: [],
    priceRange: [0, 1000],
    type: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesGender =
      filters.gender.length === 0 || filters.gender.includes(product.gender);

    const matchesColor =
      filters.color.length === 0 || filters.color.includes(product.color);

    const matchesType =
      filters.type.length === 0 || filters.type.includes(product.type);

    const matchesPrice =
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];

    return (
      matchesSearch &&
      matchesGender &&
      matchesColor &&
      matchesType &&
      matchesPrice &&
      product.quantity > 0
    );
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const updatedFilter = prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value];

      return { ...prevFilters, [filterType]: updatedFilter };
    });
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/4 p-4">
        <SearchBar setSearchTerm={setSearchTerm} />
        <Filter
          setFilters={setFilters}
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
      </div>
      <div className="w-[50%] h-max md:w-3/4 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
