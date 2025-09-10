import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import ProductForm from "../Components/ProductForm";
import Navbar from "../Components/Navbar";
import "./ProductList.css";

const ProductList = () => {

 

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Fetch all products
const fetchProducts = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};


  useEffect(() => {
    fetchProducts();
  }, []);

const handleSubmit = async (data) => {
  try {
    if (editingProduct) {
      await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, data);
      setEditingProduct(null);
    } else {
      await axios.post("http://localhost:5000/api/products", data);
    }
    setShowForm(false); // close form
    fetchProducts();    // refresh list
  } catch (error) {
    console.error("Error submitting product:", error);
  }
};



  // Delete product
  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;
  try {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};


  // Apply search
  let displayedProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply sort separately (only when user clicks sort button)
  if (isSorted) {
    displayedProducts = [...displayedProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  return (
    <div>
      {/* Navbar with search, sort, add */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isSorted={isSorted}
        setIsSorted={setIsSorted}
        onAddProductClick={() => {
          setEditingProduct(null); // ensure clean form
          setShowForm(true);
        }}
      />

      {/* Conditionally show Add/Edit form */}
      {showForm && (
        <ProductForm
          onSubmit={handleSubmit}
          editingProduct={editingProduct}
          onCancel={() => {
            setEditingProduct(null);
            setShowForm(false);
          }}
        />
      )}

      {/* Product Grid */}
      <div className="product-grid">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={handleDelete}
              onEdit={(p) => {
                setEditingProduct(p);
                setShowForm(true);
              }}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
