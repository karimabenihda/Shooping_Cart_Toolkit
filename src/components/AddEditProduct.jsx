import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToListProduct, updateProduct } from '../slice/ProductSlice';

const AddEditProduct = ({ productToEdit }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(
    productToEdit || { id: '', title: '', price: '', image: '', category: '' }
  );

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.title]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productToEdit) {
      dispatch(updateProduct(product));
    } else {
      dispatch(addToListProduct(product));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input className='form-control'
        type="text"
        title="title"
        value={product.title}
        onChange={handleChange}
        placeholder="Product Name"
      />
      <input className='form-control'
        type="number"
        title="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <input className='form-control'
        type="text"
        title="image"
        value={product.image}
        onChange={handleChange}
        placeholder="Image URL"
      />
      <input className='form-control'
        type="text"
        title="category"
        value={product.category}
        onChange={handleChange}
        placeholder="Category"
      />
      <button className='btn btn-primary' type="submit">Save</button>
    </form>
  );
};

export default AddEditProduct;
