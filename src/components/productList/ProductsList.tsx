import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchProducts,
  selectCombinedProducts,
  // selectFilteredProducts,
  setSearchQuery,
} from '../../store/productsSlice';
import { AppDispatch } from '../../store/store';
import ProductCard from '../productCard/ProductCard';
import Pagination from '../shared/Pagination/Pagination';

const ProductsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectCombinedProducts);
  const navigate = useNavigate();

  const [showFavorites, setShowFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const favorites = products.filter((product) => product.liked);
  const displayedProducts = showFavorites ? favorites : products;

  const paginatedProducts = displayedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h2>Products</h2>

      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      />

      <button onClick={() => navigate('/create-product')}>
        ➕ Create Product
      </button>

      <button onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? 'Show All' : 'Show Favorites'}
      </button>

      <div style={{ display: 'grid', gap: '10px' }}>
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={displayedProducts.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductsList;
