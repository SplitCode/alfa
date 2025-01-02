import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProducts,
  // selectProducts,
  // selectFavorites,
} from '../store/productsSlice';
import { AppDispatch, RootState } from '../store/store';
import ProductCard from './ProductCard';

const ProductsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const products = useSelector(selectProducts);
  const favorites = useSelector((state: RootState) => state.products.favorites);
  const products = useSelector((state: RootState) => state.products.products);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const displayedProducts = showFavorites ? favorites : products;

  return (
    <div>
      <h2>Products</h2>
      <button onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? 'Show All' : 'Show Favorites'}
      </button>
      <div style={{ display: 'grid', gap: '10px' }}>
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
