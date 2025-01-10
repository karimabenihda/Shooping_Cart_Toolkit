import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../slice/CartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price (Excl. Tax)</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>
                <button onClick={() => dispatch(decrementQuantity(item.id))} className='btn btn-danger'>-</button>
                {item.quantity}
                <button onClick={() => dispatch(incrementQuantity(item.id))} className='btn btn-success'>+</button>
              </td>
              <td>{item.price}€</td>
              <td>{item.price * item.quantity}€</td>
              <td>
                <button onClick={() => dispatch(removeFromCart(item.id))} className='btn btn-danger'>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total Amount: {totalAmount}€</h3>
    </div>
  );
};

export default Cart;
