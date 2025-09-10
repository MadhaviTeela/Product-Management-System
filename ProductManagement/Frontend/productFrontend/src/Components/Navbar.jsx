import React from "react";
import "./Navbar.css";

const Navbar = ({ searchTerm, setSearchTerm, isSorted, setIsSorted, onAddProductClick }) => {
  return (
    <nav className="navbar">
      <h2>🛍️ Product Management</h2>

      <div className="navbar-controls">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Sort */}
        <button onClick={() => setIsSorted(!isSorted)}>
          {isSorted ? "Clear Sort" : "Sort By Price"}
        </button>

        {/* Add Product */}
        <button className="add-btn" onClick={onAddProductClick}>
          Add Product
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
