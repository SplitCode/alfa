import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
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
  localProducts: Product[];
  favorites: Product[];
  loading: boolean;
  searchQuery: string;
}

const initialState: ProductsState = {
  products: [],
  localProducts: [],
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
      const product = [...state.localProducts, ...state.products].find(
        (p) => p.id === action.payload
      );
      if (product) {
        product.liked = !product.liked;
      }
    },

    removeProduct(state, action: PayloadAction<number>) {
      state.localProducts = state.localProducts.filter(
        (p) => p.id !== action.payload
      );
      state.products = state.products.filter((p) => p.id !== action.payload);
    },

    addProduct(state, action: PayloadAction<Product>) {
      state.localProducts.push(action.payload);
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

const selectLocalProducts = (state: { products: ProductsState }) =>
  state.products.localProducts;

const selectProducts = (state: { products: ProductsState }) =>
  state.products.products;

export const selectCombinedProducts = createSelector(
  [selectLocalProducts, selectProducts],
  (localProducts, products) => [...localProducts, ...products]
);

export const selectFilteredProducts = createSelector(
  [
    selectCombinedProducts,
    (state: { products: ProductsState }) => state.products.searchQuery,
  ],
  (combinedProducts, searchQuery) =>
    combinedProducts.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
);

export const { toggleLike, removeProduct, addProduct, setSearchQuery } =
  productsSlice.actions;

export default productsSlice.reducer;
