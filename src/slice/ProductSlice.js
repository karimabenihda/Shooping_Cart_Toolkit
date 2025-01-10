import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk pour récupérer les produits via l'API
export const fetchFromAPI = createAsyncThunk(
  'products/fetchFromAPI',
  async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data.products; // Assuming the response has a products array
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle', // 'loading', 'succeeded', 'failed'
  },
  reducers: {
    addToListProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    // You can implement addToCart similarly
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFromAPI.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFromAPI.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchFromAPI.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addToListProduct, removeProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;
