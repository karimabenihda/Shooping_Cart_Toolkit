import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFromAPI } from '../slice/ProductSlice';
import { addToCart } from '../slice/CartSlice';
import { Navbar, Alert } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

const ProductsList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    dispatch(fetchFromAPI());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterCategory = (e) => {
    setFilterCategory(e.target.value);
  };

  // Get unique categories from the products
  const categories = [...new Set(products.map((product) => product.category))];

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const productName = product.title || '';
    const matchesSearch = productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? product.category === filterCategory : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <Navbar bg="light">
        <Navbar.Brand href="#home">Product List</Navbar.Brand>
      </Navbar>
      <div className="container mt-3">
        <Alert variant="info">
          <input
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={handleSearch}
          />
          <select onChange={handleFilterCategory} value={filterCategory}>
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </Alert>

        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="col-md-4" key={product.id}>
                <div className="card">
                  <img src={product.thumbnail} alt={product.title} style={{width:'130px',height:'100px'}}/>
                  <div className="card-body">
                    <h5>{product.title}</h5>
                    <p>Price: {product.price}€</p>
                    <button onClick={() => handleAddToCart(product)}>
                      <FaShoppingCart /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
