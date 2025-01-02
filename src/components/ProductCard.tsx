import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleLike, removeProduct } from '../store/productsSlice';
import { useNavigate } from 'react-router-dom';
import { Product } from '../store/productsSlice';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = () => dispatch(toggleLike(product.id));
  const handleRemove = () => dispatch(removeProduct(product.id));
  const handleCardClick = () => navigate(`/products/${product.id}`);

  return (
    <div
      style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}
    >
      <div onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <h3>{product.title.slice(0, 10)}...</h3>
        <p>{product.body.slice(0, 100)}...</p>
      </div>
      <div>
        <button
          onClick={handleLike}
          style={{ color: product.liked ? 'red' : 'black' }}
        >
          ❤️
        </button>
        <button onClick={handleRemove}>🗑️</button>
      </div>
    </div>
  );
};

export default ProductCard;
