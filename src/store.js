import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slice/ProductSlice';
import cartReducer from './slice/CartSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});

export default store;
