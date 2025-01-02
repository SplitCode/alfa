import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  body: string;
  // image: string;
  liked?: boolean;
}

interface ProductsState {
  products: Product[];
  favorites: Product[];
  loading: boolean;
}

const initialState: ProductsState = {
  products: [],
  favorites: [],
  loading: false,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    return response.data;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<number>) {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.liked = !product.liked;
      }
    },

    removeProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },

    addProduct(state, action: PayloadAction<Product>) {
      state.products.push({ ...action.payload, liked: false });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectProducts = (state: { products: ProductsState }) =>
  state.products.products;

export const selectFavorites = (state: { products: ProductsState }) =>
  state.products.products.filter((product) => product.liked);

export const selectFilteredProducts = (
  state: { products: ProductsState },
  search: string
) =>
  state.products.products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

export const { toggleLike, removeProduct, addProduct } = productsSlice.actions;
export default productsSlice.reducer;
