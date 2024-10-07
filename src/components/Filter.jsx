import React from "react";

function Filter({ filters, handleFilterChange }) {
  const colorOptions = ["Red", "Blue", "Green"];
  const genderOptions = ["Men", "Women"];
  const typeOptions = ["Polo", "Hoodie", "Basic"];
  const priceRanges = [
    { label: "0 - Rs 250", range: [0, 250] },
    { label: "Rs 251 - Rs 450", range: [251, 450] },
    { label: "Rs 450+", range: [451, 1000] },
  ];

  return (
    <div className="mb-4">
      <h3 className="font-bold">Colour</h3>
      {colorOptions.map((color) => (
        <label key={color} className="block">
          <input
            type="checkbox"
            checked={filters.color.includes(color)}
            onChange={() => handleFilterChange("color", color)}
          />{" "}
          {color}
        </label>
      ))}

      <h3 className="font-bold mt-4">Gender</h3>
      {genderOptions.map((gender) => (
        <label key={gender} className="block">
          <input
            type="checkbox"
            checked={filters.gender.includes(gender)}
            onChange={() => handleFilterChange("gender", gender)}
          />{" "}
          {gender}
        </label>
      ))}

      <h3 className="font-bold mt-4">Price</h3>
      {priceRanges.map(({ label, range }) => (
        <label key={label} className="block">
          <input
            type="checkbox"
            checked={
              filters.priceRange[0] === range[0] &&
              filters.priceRange[1] === range[1]
            }
            onChange={() => handleFilterChange("priceRange", range)}
          />{" "}
          {label}
        </label>
      ))}

      <h3 className="font-bold mt-4">Type</h3>
      {typeOptions.map((type) => (
        <label key={type} className="block">
          <input
            type="checkbox"
            checked={filters.type.includes(type)}
            onChange={() => handleFilterChange("type", type)}
          />{" "}
          {type}
        </label>
      ))}
    </div>
  );
}

export default Filter;
