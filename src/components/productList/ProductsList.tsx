import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchProducts,
  selectFilteredProducts,
  setSearchQuery,
} from '../../store/productsSlice';
import { AppDispatch } from '../../store/store';
import ProductCard from '../productCard/ProductCard';
import Pagination from '../shared/Pagination/Pagination';
import './ProductsList.css';

const ProductsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectFilteredProducts);
  const navigate = useNavigate();

  const [showFavorites, setShowFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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
    <div className="products-list">
      <h2>Products</h2>

      <div className="controls-container">
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />

        <button onClick={() => navigate('/create-product')}>
          Create Product
        </button>

        <button onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? 'Show All' : 'Show Favorites'}
        </button>
      </div>

      <div className="products-container">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="pagination-container">
        <Pagination
          currentPage={currentPage}
          totalItems={displayedProducts.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProductsList;
