import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleLike, removeProduct } from '../../store/productsSlice';
import { Product } from '../../store/productsSlice';
import { AiFillHeart, AiOutlineHeart, AiOutlineClose } from 'react-icons/ai';
import './ProductCard.css';
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleLike(product.id));
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeProduct(product.id));
  };

  const handleCardClick = () => navigate(`/products/${product.id}`);

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-card-body">
        <h3>
          {product.title.length > 20
            ? product.title.slice(0, 20) + '...'
            : product.title}
        </h3>
        <img
          src={product.image}
          alt={product.title}
          className="product-card-image"
        />
        <p className="product-card-category">
          Category:
          {product.category.length > 20
            ? product.category.slice(0, 20) + '...'
            : product.category}
        </p>
        <p className="product-card-description">
          {product.description.length > 50
            ? product.description.slice(0, 50) + '...'
            : product.description}
        </p>
      </div>
      <div className="product-card-actions">
        <button onClick={handleLike} className="product-card-like">
          {product.liked ? (
            <AiFillHeart color="red" size={24} />
          ) : (
            <AiOutlineHeart color="black" size={24} />
          )}
        </button>
        <button onClick={handleRemove} className="product-card-remove">
          <AiOutlineClose color="red" size={24} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
