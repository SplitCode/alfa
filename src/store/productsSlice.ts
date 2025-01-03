import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
  id: number;
  title: string;
  image: string;
  description: string;
  category: string;
  liked?: boolean;
}

interface ProductsState {
  products: Product[];
  favorites: Product[];
  loading: boolean;
  searchQuery: string;
}

const initialState: ProductsState = {
  products: [],
  favorites: [],
  loading: false,
  searchQuery: '',
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
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

    // editProduct(state, action: PayloadAction<Product>) {
    //   const index = state.products.findIndex((p) => p.id === action.payload.id);
    //   if (index !== -1) state.products[index] = action.payload;
    // },

    addProduct(state, action: PayloadAction<Product>) {
      state.products.push({ ...action.payload, liked: false });
    },

    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      // .addCase(fetchProducts.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.products = action.payload;
      // })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.map((product: Product) => ({
          ...product,
          liked: false,
        }));
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

// export const selectProducts = (state: { products: ProductsState }) =>
//   state.products.products;

// export const selectFavorites = (state: { products: ProductsState }) =>
//   state.products.products.filter((product) => product.liked);

export const selectFilteredProducts = (state: { products: ProductsState }) => {
  const { products, searchQuery } = state.products;
  return products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export const {
  toggleLike,
  removeProduct,
  addProduct,
  // editProduct,
  setSearchQuery,
} = productsSlice.actions;

export default productsSlice.reducer;
