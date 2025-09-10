import React, { useState, useEffect } from "react";
import "./ProductForm.css";

const ProductForm = ({ onSubmit, editingProduct, onCancel }) => {
  const [formData, setFormData] = useState({ name: "", price: "", description: "", category: "" });

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    } else {
      setFormData({ name: "", price: "", description: "", category: "" });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert("Name and Price are required!");
      return;
    }
    onSubmit(formData);
    setFormData({ name: "", price: "", description: "", category: "" });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} placeholder="Product Name" onChange={handleChange} />
      <input type="number" name="price" value={formData.price} placeholder="Price" onChange={handleChange} />
      
      <textarea name="description" value={formData.description} placeholder="Description" onChange={handleChange}></textarea>
      <input type="text" name="category" value={formData.category} placeholder="Category" onChange={handleChange} />
      <div className="form-actions">
        <button type="submit">{editingProduct ? "Update" : "Add"} Product</button>
        {editingProduct && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
};

export default ProductForm;
