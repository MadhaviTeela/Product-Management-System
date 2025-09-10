import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, onDelete, onEdit }) => {
  return (
    <div className="card">
      
      <h3>{product.name}</h3>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p>{product.description || "No description available"}</p>
      <p><strong>Category:</strong> {product.category || "N/A"}</p>

      <div className="card-actions">
        <button className="edit-btn" onClick={() => onEdit(product)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(product._id)}>Delete</button>
      </div>

    </div>
  );
};

export default ProductCard;
